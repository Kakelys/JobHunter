import { TokenService } from './../services/token.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/shared/auth/jwt-constants";
import { JwtPayload } from 'src/shared/auth/jwt-payload.model';

@Injectable()
export class JwtGuard implements CanActivate {

    constructor(private jwtService: JwtService, private tokenSevice: TokenService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            ) as JwtPayload;
            
            request['payload'] = payload;
        } 
        catch (err) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}