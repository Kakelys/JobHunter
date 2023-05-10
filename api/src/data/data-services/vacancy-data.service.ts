import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Page } from "src/shared/page.model";
import { VacancyNew } from "src/shared/vacancy/vacancy-new.model";
import { VacancyDetailResponse } from "src/shared/vacancy/vacancy-detail-response.model";

@Injectable()
export class VacancyDataService {

    constructor(private prisma: PrismaService) {}

    async create(vacancy: VacancyNew){
        return await this.prisma.vacancy.create({
            data: {
                company_id: +vacancy.companyId,
                owner_id: +vacancy.ownerId,
                title: vacancy.title,
                description: vacancy.description,
                salary: vacancy.salary,
            }
        })
    }

    async getById(vacancyId: number) {
        return await this.prisma.vacancy.findFirst({
            where: {
                id: +vacancyId
            },
            include: {
                company: true
            }
        });
    }

    async getDetail(vacancyId: number) : Promise<VacancyDetailResponse>  {
        let vacancy = await this.prisma.vacancy.findFirst({
            where: {
                id: +vacancyId
            },
            select : {
                id: true,
                title: true,
                description: true,
                salary: true,
                is_active: true,
                post_date: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                author: {
                    select: {
                        account: {
                            select: {
                                id: true,
                                accountInfo: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                        
                    }
                },
                _count: {
                    select: {
                        reply: true
                    }
                }

            }
        });
        
        if(!vacancy)
            return null;
        
        return {
            id: vacancy.id,
            title: vacancy.title,
            description: vacancy.description,
            salary: vacancy.salary,
            postDate: vacancy.post_date,
            isActive: vacancy.is_active,
            company: {
                id: vacancy.company.id,
                name: vacancy.company.name
            },
            author: {
                id: vacancy.author.account.id,
                name: vacancy.author.account.accountInfo.name
            },
            replies: vacancy._count.reply
        }
    }

    async getListDetails(page: Page, search: string) {
        console.log(search);
        let vacancies = await this.prisma.vacancy.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive',
                }
            },
            orderBy: {
                post_date: 'desc'
            },
            select : {
                id: true,
                title: true,
                description: true,
                salary: true,
                is_active: true,
                post_date: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                author: {
                    select: {
                        account: {
                            select: {
                                id: true,
                                accountInfo: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                        
                    }
                },
                _count: {
                    select: {
                        reply: true
                    }
                }

            }
        });
        
        if(vacancies.length == 0)
            return null;
        
        return vacancies.map(vacancy => {
            return {
                id: vacancy.id,
                title: vacancy.title,
                description: vacancy.description,
                salary: vacancy.salary,
                postDate: vacancy.post_date,
                isActive: vacancy.is_active,
                company: {
                    id: vacancy.company.id,
                    name: vacancy.company.name
                },
                author: {
                    id: vacancy.author.account.id,
                    name: vacancy.author.account.accountInfo.name
                },
                replies: vacancy._count.reply
            }
        });
    }

    async getByCompany(companyId: number, page: Page) {
        let vacancies = await this.prisma.vacancy.findMany({
            where: {
                company_id: +companyId
            },
            skip: ((page.page-1) * page.toTake),
            take: +page.toTake
        });

        return vacancies.map(company => {
            return {
                id: company.id,
                title: company.title,
                description: company.description,
                salary: company.salary,
                companyId: company.company_id,
                ownerId: company.owner_id
            }
        });
    }

    async countByCompany(companyId: number) {
        return await this.prisma.vacancy.count({
            where: {
                company_id: +companyId
            }
        })
    }

}