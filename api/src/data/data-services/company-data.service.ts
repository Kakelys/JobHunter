import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CompanyEdit } from "src/shared/company/company-edit.model";


@Injectable()
export class CompanyDataService {
 
    constructor(private prisma: PrismaService) {}

    async getByEmployerId(employerId: number) {
        return await this.prisma.company.findFirst({
            where: {
                employers: {
                    some: {
                        account_id: +employerId
                    }
                }
            }
        });
    }

    async getCompanyById(id: number) {
        return await this.prisma.company.findFirst({
            where: {
                id: +id
            },
            include: {
                _count: {
                    select: {
                        employers: true,
                        vacancies: true
                    }
                }
            },
            
        });
    }

    async getByOwner(ownerId: number) {
        return await this.prisma.company.findFirst({
            where: {
                owner_id: +ownerId
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

            // is_hr is true because owner must have opportunity to create vacancies/invite employees
            await this.prisma.employer.create({
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

    async update(company: CompanyEdit) {
        return await this.prisma.company.update({
            where: {
                id: +company.companyId
            },
            data: {
                name: company.name,
                about: company.about,
                website: company.website,
                phone: company.phone
            }
        });
    }
}