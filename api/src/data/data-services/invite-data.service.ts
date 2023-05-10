import { account } from '@prisma/client';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { InviteNew } from "src/shared/invite/invite-new.model";
import { Page } from "src/shared/page.model";
import { InviteResponse } from 'src/shared/invite/invite-response.model';


@Injectable()
export class InviteDataService {

    constructor(private prisma: PrismaService) {}

    async getById(inviteId: number) {
        return await this.prisma.invite.findFirst({
            where: {
                id: +inviteId
            }
        })
    }

    async create(data: InviteNew) {
        return await this.prisma.invite.create({
            data: {
                account_id: +data.accountId,
                inviter_id: +data.inviter.sub,
                company_id: +data.inviter.employer.companyId
            }
        })
    }

    async delete(inviteId: number) {
        return await this.prisma.invite.delete({
            where: {
                id: +inviteId
            }
        })
    }

    async getByCompanyAndAccount(acocuntId: number, companyId: number, page: Page) {
        return await this.prisma.invite.findMany({
            where: {
                company_id: +companyId,
                account_id: +acocuntId
            },
            skip: ((page.page - 1) * page.toTake),
            take: page.toTake
        })
    }

    async getByCompany(companyId: number, page: Page) : Promise<InviteResponse[]> {
        const invites = await this.prisma.invite.findMany({
            where: {
                company_id: +companyId
            },
            select: {
                id: true,
                date: true,
                company: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                inviter: {
                    select: {
                        account: {
                            select: {
                                id: true,
                                accountInfo: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                },
                account: {
                    select: {
                        id: true,
                        accountInfo: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            },
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake
        })

        if(!invites)
            return null;

        return invites.map(invite => {
            return {
                id: invite.id,
                date: invite.date,
                company: {
                    id: invite.company.id,
                    name: invite.company.name
                },
                inviter: {
                    id: invite.inviter.account.id,
                    name: invite.inviter.account.accountInfo.name
                }
            }
        });

    }

    async getByAccount(accountId: number, page: Page) : Promise<InviteResponse[]> {
        
        const invites = await this.prisma.invite.findMany({
            where: {
                account_id: +accountId
            },
            select: {
                id: true,
                date: true,
                company: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                inviter: {
                    select: {
                        account: {
                            select: {
                                id: true,
                                accountInfo: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                },
            },
            orderBy: {
                date: 'asc'
            },
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake
        })

        if(!invites)
            return null;

        return invites.map(invite => {
            return {
                id: invite.id,
                date: invite.date,
                company: {
                    id: invite.company.id,
                    name: invite.company.name
                },
                inviter: {
                    id: invite.inviter.account.id,
                    name: invite.inviter.account.accountInfo.name
                }
            }
        });
    }

    async getCountByAccount(accountId: number) {
        return await this.prisma.invite.count({
            where: {
                account_id: +accountId
            }
        })
    }

    async getCountByCompany(companyId: number) {
        return await this.prisma.invite.count({
            where: {
                company_id: +companyId
            }
        })
    }

}