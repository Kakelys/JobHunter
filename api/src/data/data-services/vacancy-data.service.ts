import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Page } from "src/shared/page.model";
import { VacancyNew } from "src/shared/vacancy/vacancy-new.model";
import { VacancyDetailResponse } from "src/shared/vacancy/vacancy-detail-response.model";
import { VacancyEdit } from "src/shared/vacancy/vacancy-edit.model";

@Injectable()
export class VacancyDataService {

    constructor(private prisma: PrismaService) {}

    async create(hrId:number, companyId: number, vacancy: VacancyNew){
        return await this.prisma.vacancy.create({
            data: {
                company_id: +companyId,
                owner_id: +hrId,
                title: vacancy.title,
                description: vacancy.description,
                salary: vacancy.salary,
            }
        })
    }

    async update(vacancyId: number, vacancy: VacancyEdit) {
        return await this.prisma.vacancy.update({
            where: {
                id: +vacancyId
            },
            data: {
                title: vacancy.title,
                description: vacancy.description,
                salary: vacancy.salary,
                is_active: vacancy.isActive
            }
        });
    }

    async delete(vacancyId: number) {
        return await this.prisma.vacancy.delete({
            where: {
                id: +vacancyId
            }
        });
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
            },
            skip: ((page.page-1) * page.toTake),
            take: +page.toTake
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
            orderBy: {
                post_date: 'desc'
            },
            skip: ((page.page-1) * page.toTake),
            take: +page.toTake
        });

        return vacancies.map(vacancy => {
            return {
                id: vacancy.id,
                title: vacancy.title,
                description: vacancy.description,
                salary: vacancy.salary,
                companyId: vacancy.company_id,
                ownerId: vacancy.owner_id,
                postDate: vacancy.post_date
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