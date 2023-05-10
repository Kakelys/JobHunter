import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class EmployerDataService {

    constructor(private prisma: PrismaService) {}

    async getByAccountId(id: number) {
        return await this.prisma.employer.findFirst({
            where: {
                account_id: id
            }
        });
    }

    async getCountByCompany(companyId: number) {
        return await this.prisma.employer.count({
            where: {
                company_id: companyId
            }
        });
    }

    async create(companyId: number, accountId: number) {
        return await this.prisma.employer.create({
            data: {
                company_id: +companyId,
                account_id: +accountId
            }
        })
    }

    async delete(accountId: number) {
        await this.prisma.employer.delete({
            where: {
                account_id: +accountId
            }
        })
    }
}