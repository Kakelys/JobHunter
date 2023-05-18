import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Page } from "src/shared/page.model";
import { Employer } from "src/shared/employer/employer.model";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { NotFoundError } from "rxjs";
import { convertToBoolean } from "src/shared/funcs/string-to-boolean";

@Injectable()
export class EmployerDataService {

    constructor(private prisma: PrismaService) {}

    async getByAccountId(id: number) {
        return await this.prisma.employer.findFirst({
            where: {
                account_id: +id
            },
            include: {
                company: true
            }
        });
    }

    async getCountByCompany(companyId: number) {
        return await this.prisma.employer.count({
            where: {
                company_id: +companyId
            }
        });
    }

    async getByCompany(companyId: number, page: Page) : Promise<Employer[]> {
        const employers = await this.prisma.employer.findMany({
            where: {
                company_id: +companyId
            },
            include: {
                account: {
                    include: {
                        accountInfo: true
                    }
                }
            },
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake
        });

        if(employers.length == 0)
            return null;

        return employers.map(empl => {
            return {
                accountId: empl.account_id,
                companyId: empl.company_id,
                isHr: empl.is_hr,
                name: empl.account.accountInfo.name,
            }
        })
    }

    async create(companyId: number, accountId: number) {
        return await this.prisma.employer.create({
            data: {
                company_id: +companyId,
                account_id: +accountId
            }
        })
    }

    async update(employerId: number, isHr: string) {
        return await this.prisma.employer.update({
            where: {
                account_id: +employerId
            },
            data: {
                is_hr: convertToBoolean(isHr)
            }
        });
    } 

    async delete(accountId: number) {
        await this.prisma.employer.delete({
            where: {
                account_id: +accountId
            }
        })
    }
}