import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { reply_status } from "@prisma/client";
import { Page } from "src/shared/page.model";
import { ReplyResponse } from "src/shared/reply/reply-response.model";

@Injectable() 
export class ReplyDataService {

    constructor(
        private prisma: PrismaService
    ) {}

    async getById(replyId: number) {
        return await this.prisma.reply.findFirst({
            where: {
                id: +replyId
            },
            include: {
                account: true,
                vacancy: true
            }
        });
    }

    async getByAccountAndVacancy(accountId: number, vacancyId: number) {
        return await this.prisma.reply.findFirst({
            where: {
                account_id: +accountId,
                vacancy_id: +vacancyId
            }
        });
    }

    async getCountByVacancy(vacancyId: number) {
        return await this.prisma.reply.count({
            where: {
                vacancy_id: +vacancyId
            }
        });
    }

    async getByVacancy(vacancyId: number, page: Page) : Promise<ReplyResponse[]> {
        const replies = await this.prisma.reply.findMany({
            where: {
                vacancy_id: +vacancyId
            },
            include: {
                vacancy: true,
                account: {
                    include: {
                        accountInfo: true
                    }
                }
            },
            orderBy: [
                {
                    status: 'asc'
                },
                {
                    date: 'desc',
                }
            ],
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake,
        });

        if(replies.length == 0)
            return null;

        return replies.map(reply => {
            return {
                id: reply.id,
                date: reply.date,
                status: reply.status,
                vacancy: {
                    id: reply.vacancy.id,
                    title: reply.vacancy.title
                },
                account: {
                    id: reply.account.id,
                    name: reply.account.accountInfo.name
                }
            }
        });
    }

    async getByCompany(companyId: number, page: Page) {
        return await this.prisma.reply.findMany({
            where: {
                vacancy: {
                    company_id: +companyId
                }
            },
            include: {
                account: true
            },
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake,
        });
    }

    async getByAccount(accountId: number, page: Page) : Promise<ReplyResponse[]> {
        const replies = await this.prisma.reply.findMany({
            where: {
                account_id: +accountId
            },
            include: {
                vacancy: true,
                account: {
                    include: {
                        accountInfo: true
                    }
                }
            },
            orderBy: {
                date: 'desc'
            },
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake,
        });

        if(replies.length == 0)
            return null;

        return replies.map(reply => {
            return {
                id: reply.id,
                date: reply.date,
                status: reply.status,
                vacancy: {
                    id: reply.vacancy.id,
                    title: reply.vacancy.title
                },
                account: {
                    id: reply.account.id,
                    name: reply.account.accountInfo.name
                }
            }
        });
    }

    async getByAccountAndCompany(accountId: number, companyId: number, page: Page) : Promise<ReplyResponse[]> {
        const replies = await this.prisma.reply.findMany({
            where: {
                account_id: +accountId,
                vacancy: {
                    company_id: +companyId
                }
            },
            include: {
                vacancy: true,
                account: {
                    include: {
                        accountInfo: true
                    }
                }
            },
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake,
        });

        return replies.map(reply => {
            return {
                id: reply.id,
                date: reply.date,
                status: reply.status,
                vacancy: {
                    id: reply.vacancy.id,
                    title: reply.vacancy.title
                },
                account: {
                    id: reply.account.id,
                    name: reply.account.accountInfo.name
                }
            }
        });
    }

    async create(payload: JwtPayload, vacancyId: any) {
        return await this.prisma.reply.create({
            data: {
                vacancy_id: +vacancyId,
                account_id: +payload.sub,
                status: reply_status.pending
            }
        });
    }

    async update(replyId: any, status: reply_status) {
        return await this.prisma.reply.update({
            where: {
                id: +replyId
            },
            data: {
                status: status
            }
        });
    }

}