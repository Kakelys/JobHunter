import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";


@Injectable()
export class CompanyDataService {
 
    constructor(private prisma: PrismaService) {}

    async getCompanyById(id: number) {
        return await this.prisma.company.findFirst({
            where: {
                id: id
            }
        });
    }

    async getByOwner(ownerId: number) {
        return await this.prisma.company.findFirst({
            where: {
                owner_id: ownerId
            }
        });
    }

    async getByName(name: string) {
        return await this.prisma.company.findFirst({
            where: {
                name: name
            }
        });
    }

    async create(name: string, ownerId: number) {
        return await this.prisma.$transaction(async _ => {
            const newCompany = await this.prisma.company.create({
                data: {
                    name: name,
                    owner_id: ownerId
                }
            });

            const employer = await this.prisma.employer.create({
                data: {
                    account_id: ownerId,
                    company_id: newCompany.id,
                    is_hr: true
                }
            });

            return newCompany;
        })
    }

    async delete(id: number) {
        return await this.prisma.company.delete({
            where: {
                id: id
            }
        });
    }
}