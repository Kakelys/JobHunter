import { TokenService } from './../services/token.service';
import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/services/auth.service";
import { JwtDto } from 'src/shared/jwt.model';
import { LoginDto } from "src/shared/login-dto.model";
import { RegisterDto } from "src/shared/register-dto.model";

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
    
    constructor(
        private accountService: AuthService,
        private tokenService: TokenService,
        ) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return await this.accountService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
    return await this.accountService.login(dto);
    }

    @Post('auth')
    async auth(@Body() dto: JwtDto) {
        return await this.accountService.auth(dto);
    }

}