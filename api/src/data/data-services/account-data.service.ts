import { RegisterDto } from './../../shared/register-dto.model';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { compare } from 'bcrypt';
import { LoginDto } from 'src/shared/login-dto.model';

@Injectable()
export class AccountDataService {

    constructor(private prisma: PrismaService) {}

    async getById(id: number) {
        return await this.prisma.account.findFirst({ 
            where: { id },
        });
    }

    async getByLogin(login: string) {
        return await this.prisma.account.findFirst({ 
            where: { login: login },
        });
    }

    async getByLoginAndPassword(loginDto: LoginDto) {
        let account =  await this.prisma.account.findFirst({ 
            where: { 
                login: loginDto.login
            },
        });

        if(!await compare(loginDto.password, account.password_hash))
            return null;

        return account;
    }

    async create(registerDto: RegisterDto, password_hash:string) {
        return await this.prisma.account.create({
            data: {
                login: registerDto.username,
                password_hash: password_hash,
                account_info: {
                    create: {
                        name: registerDto.name,
                        email: registerDto.email
                    }
                }
            },
            include: {
                account_info: true
            }
        });
    }
}