import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { account } from "@prisma/client";
import { TokenDataService } from "src/data/data-services/token-data.service";
import { JwtDto } from "src/shared/jwt.model";
import { jwtConstants } from 'src/shared/jwt-constants';

@Injectable()
export class TokenService {

    constructor(private tokenData: TokenDataService, private jwtService: JwtService) {}

    generatePair(user: account) : JwtDto {
        const payload = { sub: user.id, is_admin: user.is_admin };

        const accessToken = this.jwtService.sign(payload, {expiresIn: jwtConstants.accessExpiresIn});
        const refreshToken = this.jwtService.sign(payload, {expiresIn: jwtConstants.refreshExpiresIn});

        return {accessToken, refreshToken};
    }

    async refresh(refreshToken: string) : Promise<JwtDto> {
        let tokenEntity = await this.tokenData.getByToken(refreshToken);
        if(!tokenEntity)
            throw new BadRequestException("Invalid refresh token");
        
        if(tokenEntity.date < new Date())
            throw new BadRequestException("Refresh token expired");

        let payload = await this.getTokenPayload(refreshToken);
        
        const accessToken = this.jwtService.sign({sub: payload.sub, is_admin: payload.is_admin}, {expiresIn: jwtConstants.accessExpiresIn});
        const newRefreshToken = this.jwtService.sign({sub: payload.sub, is_admin: payload.is_admin}, {expiresIn: jwtConstants.refreshExpiresIn});
        
        await this.tokenData.update(payload.sub, tokenEntity.id, newRefreshToken);
        
        return {
            accessToken: accessToken,
            refreshToken: newRefreshToken
        };
    }

    getTokenPayload(token: string) {
        return this.jwtService.verify(token) as {sub: number, is_admin: boolean, expiresIn: string | number};
    }
}