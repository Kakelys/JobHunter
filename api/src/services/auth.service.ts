import { AccountDataService } from '../data/data-services/account-data.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/shared/auth/user-dto.model';
import { TokenService } from './token.service';
import { TokenDataService } from 'src/data/data-services/token-data.service';
import {hash, genSalt} from 'bcrypt';
import { RegisterDto } from 'src/shared/auth/register-dto.model';
import { LoginDto } from 'src/shared/auth/login-dto.model';
import { JwtDto } from 'src/shared/auth/jwt.model';

@Injectable()
export class AuthService {

    constructor(private tokenService: TokenService,
            private tokenDataService: TokenDataService,
            private accountDataService: AccountDataService){}

    async register(registerDto: RegisterDto) : Promise<UserDto> {
        //check if user exists
        if(await this.accountDataService.getByLogin(registerDto.username))
            throw new BadRequestException("Login already taken");

        //gen hash
        let salt = await genSalt(10);
        let passHash = await hash(registerDto.password, salt);

        //create new user
        let account = await this.accountDataService.create(registerDto, passHash);

        //generate jwt&save refresh
        let jwt = this.tokenService.generatePair(account);

        this.tokenDataService.create(account.id, jwt.refreshToken);
        
        return {
            id: account.id,
            name: account.accountInfo.name,
            isAdmin: account.is_admin,
            employer: null,
            jwt: jwt
        };
    }

    async login(loginDto: LoginDto): Promise<UserDto> {

        let account = await this.accountDataService.getByLoginAndPassword(loginDto);
        if(account == null)
            throw new BadRequestException("Invalid login or password");

        let jwt = await this.tokenService.generatePair(account);

        this.tokenDataService.create(account.id, jwt.refreshToken);
        const empl = this.tokenService.getTokenPayload(jwt.refreshToken).employer;

        return {
            id: account.id,
            name: account.accountInfo.name,
            isAdmin: account.is_admin,
            employer: empl,
            jwt: jwt
        };
    }

    async auth(jwtDto: JwtDto) : Promise<UserDto> {
        try {
            let oldPayload = this.tokenService.getTokenPayload(jwtDto.refreshToken);

            let user = await this.accountDataService.getById(oldPayload.sub);
            let newTokens = await this.tokenService.refresh(user, jwtDto.refreshToken);

            let newPayload = this.tokenService.getTokenPayload(newTokens.refreshToken);

            return {
                id: newPayload.sub,
                name: newPayload.name,
                isAdmin: newPayload.isAdmin,
                employer: newPayload.employer,
                jwt: newTokens
            }
        } catch (error) {
            throw new BadRequestException("Invalid refresh token");
        }
    }
}