import { AccountDataService } from '../data/data-services/account-data.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/shared/login-dto.model';
import { RegisterDto } from '../shared/register-dto.model';
import { JwtDto } from 'src/shared/jwt.model';
import { UserDto } from 'src/shared/user-dto.model';
import { TokenService } from './token.service';
import { TokenDataService } from 'src/data/data-services/token-data.service';
import {hash, genSalt, compare} from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class AuthService {

    constructor(private tokenService: TokenService,
            private tokenDataService: TokenDataService,
            private accountDataService: AccountDataService){}

    async register(registerDto: RegisterDto) : Promise<UserDto> {
        //check if user exists
        if(this.accountDataService.getByLogin(registerDto.username))
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
            is_admin: account.is_admin,
            jwt: jwt
        };
    }

    async login(loginDto: LoginDto): Promise<UserDto> {

        let account = await this.accountDataService.getByLoginAndPassword(loginDto);
        if(account == null)
            throw new BadRequestException("Invalid login or password");

        let jwt = await this.tokenService.generatePair(account);

        this.tokenDataService.create(account.id, jwt.refreshToken);

        return {
            id: account.id,
            is_admin: account.is_admin,
            jwt: jwt
        };
    }

    async auth(jwtDto: JwtDto) : Promise<UserDto> {
        let newTokens = await this.tokenService.refresh(jwtDto.refreshToken);

        let payload = this.tokenService.getTokenPayload(jwtDto.refreshToken);

        return {
            id: payload.sub,
            is_admin: payload.is_admin,
            jwt: newTokens
        }
    }
}