import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Page } from "src/shared/page.model";
import { Vacancy } from "src/shared/vacancy/vacancy-response.model";
import { VacancyDetailResponse } from "src/shared/vacancy/vacancy-detail-response.model";
import { FavoriteResponse } from "src/shared/favorite/favorite-response.model";

@Injectable()
export class FavoriteDataService {

    constructor(private prisma: PrismaService) {}

    async create(accountId: number, vacancyId: number) {
        return await this.prisma.favorite.create({
            data: {
                vacancy_id: +vacancyId,
                account_id: +accountId,
            }
        });
    }

    async delete(favoriteId: number) {
        return await this.prisma.favorite.deleteMany({
            where: {
                id: +favoriteId
            }
        });
    }

    async getById(favoriteId: number) {
        return await this.prisma.favorite.findFirst({
            where: {
                id: +favoriteId
            }
        });
    }
    
    async getByAccountAndVacancy(accountId: number, vacancyId: number) {
        return await this.prisma.favorite.findFirst({
            where: {
                account_id: +accountId,
                vacancy_id: +vacancyId
            }
        });
    }

    async getByAccount(accountId: number, page: Page) {
        const favorites = await this.prisma.favorite.findMany({
            where: {
                account_id: +accountId
            },
            include: {
                vacancy: {
                    include: {
                        company: true,
                        author: {
                            include: {
                                account: {
                                    include: {
                                        accountInfo: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake
        });

        if(favorites.length == 0)
            return null;

        return favorites.map(fav => {
            return {
                id: fav.id,
                date: fav.date,
                vacancy: {
                    id: fav.vacancy.id,
                    title: fav.vacancy.title,
                    description: fav.vacancy.description,
                    salary: fav.vacancy.salary,
                    postDate: fav.vacancy.post_date,
                    isActive: fav.vacancy.is_active,
                    company: {
                        id: fav.vacancy.company.id,
                        name: fav.vacancy.company.name,
                    },
                    author: {
                        id: fav.vacancy.author.account_id,
                        name: fav.vacancy.author.account.accountInfo.name
                    }
                }
            }
        });
    }

}