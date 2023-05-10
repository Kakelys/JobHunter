import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from "@nestjs/common";
import { TokenDataService } from "src/data/data-services/token-data.service";
import { JwtDto } from 'src/shared/auth/jwt.model';
import { jwtConstants } from 'src/shared/auth/jwt-constants';
import { JwtPayload } from 'src/shared/auth/jwt-payload.model';
import { Employer } from 'src/shared/employer-response.model';

@Injectable()
export class TokenService {

    constructor(private tokenData: TokenDataService, private jwtService: JwtService) {}

    generatePair(user: any) : JwtDto {
        const payload : JwtPayload = { 
            sub: user.id,
            name: user.accountInfo.name,
            isAdmin: user.is_admin, 
            employer: user.employer ? {
                accountId: user.employer.account_id,
                companyId: user.employer.company_id,
                isHr: user.employer.is_hr
            } : null,
            expiresIn: null
        };

        const accessToken = this.jwtService.sign(payload, {expiresIn: jwtConstants.accessExpiresIn});
        const refreshToken = this.jwtService.sign(payload, {expiresIn: jwtConstants.refreshExpiresIn});

        return {accessToken, refreshToken};
    }

    async refresh(user: any, refreshToken: string) : Promise<JwtDto> {
        let tokenEntity = await this.tokenData.getByToken(refreshToken);
        if(!tokenEntity)
            throw new BadRequestException("Invalid refresh token");
        
        if(tokenEntity.date < new Date())
            throw new BadRequestException("Refresh token expired");

        let payload = await this.getTokenPayload(refreshToken);

        const newPair = this.generatePair(user); 
        
        await this.tokenData.update(payload.sub, tokenEntity.id, newPair.refreshToken);
        
        return {
            accessToken: newPair.accessToken,
            refreshToken: newPair.refreshToken
        };
    }

    getTokenPayload(token: string) {
        return this.jwtService.verify(token) as JwtPayload;
    }
}