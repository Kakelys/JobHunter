import { account } from '@prisma/client';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { compare } from 'bcrypt';
import { UserDetail } from "src/shared/account/user-detail.model";
import { LoginDto } from "src/shared/auth/login-dto.model";
import { RegisterDto } from "src/shared/auth/register-dto.model";

@Injectable()
export class AccountDataService {

    constructor(private prisma: PrismaService) {}

    async getById(id: number) {
        return await this.prisma.account.findFirst({ 
            where: { id },
            include: {
                accountInfo: true,
                employer: true
            }
        });
    }

    async getByIdDetail(id: number) : Promise<UserDetail> {
        const user = await this.prisma.account.findFirst({ 
            where: { 
                id: +id 
            },
            include: {
                accountInfo: true,
                employer: {
                    include: {
                        company: true
                    }
                }
            }
        });
        
        if(!user)
            return null;

        return {
            id: user.id,
            name: user.accountInfo.name,
            website: user.accountInfo.website,
            about: user.accountInfo.about,
            company: user.employer ? {
                id: user.employer.company.id,
                name: user.employer.company.name,
            } : null
        }
    }

    async getByLogin(login: string) {
        return await this.prisma.account.findFirst({ 
            where: { login: login },
        });
    }

    async getByLoginAndPassword(loginDto: LoginDto) {
        let account = await this.prisma.account.findFirst({ 
            where: { 
                login: loginDto.login
            },
            include: {
                employer: true,
                accountInfo: true
            },
        });
        
        if(!account)
            return null;

        if(!await compare(loginDto.password, account.password_hash))
            return null;

        return account;
    }

    async create(registerDto: RegisterDto, password_hash:string) {
        return await this.prisma.account.create({
            data: {
                login: registerDto.username,
                password_hash: password_hash,
                accountInfo: {
                    create: {
                        name: registerDto.name,
                        email: registerDto.email
                    }
                }
            },
            include: {
                accountInfo: true
            }
        });
    }
}