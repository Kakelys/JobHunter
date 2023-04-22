import { account, token } from '@prisma/client';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { jwtConstants } from 'src/shared/jwt-constants';

@Injectable()
export class TokenDataService {
    
    constructor(private prisma: PrismaService) {}

    async create(accountId: number, token: string) {
        let now = new Date();
        let expire = new Date(now.getTime() + (jwtConstants.refreshExpiresIn * 1000));
        this.deleteOld(accountId);
        //create new
        await this.prisma.token.create({
            data: {
                account_id: accountId,
                token: token,
                date: expire 
            }
        });
    }

    async deleteOld(accountId: number) {
        //delete oldest if count > maxCount
        var tokens = await this.prisma.token.findMany({
            where: {
                account_id: accountId
            },
            orderBy: {
                date: 'asc'
            }
        });

        if(tokens.length > jwtConstants.maxPerAccount)
        {
            await this.prisma.token.delete({
                where: {
                    id: tokens[0].id
                }
            });
        }
    }

    async update(accountId: number, tokenId: number, token: string) {
        let now = new Date();
        let expire = new Date(now.getTime() + (jwtConstants.refreshExpiresIn * 1000));
        this.deleteOld(accountId);
        
        await this.prisma.token.update({
            where: {
                id: tokenId
            },
            data: {
                token: token,
                date: expire
            }
        });
    }

    async getByToken(refreshToken: string): Promise<token> {
        return await this.prisma.token.findFirst({
            where: {
                token: refreshToken
            }
        });
    }

}