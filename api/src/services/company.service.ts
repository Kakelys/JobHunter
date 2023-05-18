import { JwtPayload } from './../shared/auth/jwt-payload.model';
import { EmployerDataService } from './../data/data-services/employer-data.service';
import { CompanyDataService } from 'src/data/data-services/company-data.service';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CompanyEdit } from 'src/shared/company/company-edit.model';
import { CompanyNew } from 'src/shared/company/company-new.model';
import { CompanyResponse } from 'src/shared/company/company-response.model';

@Injectable()
export class CompanyService {

    constructor(private companyData: CompanyDataService,
        private employerData: EmployerDataService) {}

    async create(senderId: number, company: CompanyNew) {
        if((await this.employerData.getByAccountId(senderId))) {
            throw new BadRequestException("You already part of some company");
        }

        if((await this.companyData.getByName(company.name))) {
            throw new BadRequestException("Company with the same name already exists");
        }

        return await this.companyData.create(company.name, senderId);
    }

    async getById(companyId: number) : Promise<CompanyResponse> {
        const company = await this.companyData.getCompanyById(companyId);

        if(!company)
            throw new BadRequestException("Company not found");

        return {
            id: company.id,
            ownerId: company.owner_id,
            name: company.name,
            about: company.about,
            website: company.website,
            phone: company.phone,
            employers: company._count.employers,
            vacancies: company._count.vacancies
        }
    }  
    
    async update(senderId: number, company: CompanyEdit) {
        const companyToUpdate = await this.companyData.getCompanyById(company.companyId);

        if(!companyToUpdate)
            throw new BadRequestException("Company not found");

        if(senderId !== companyToUpdate.owner_id)
            throw new ForbiddenException("You have no permission to update this company");

        if(companyToUpdate.name !== company.name && (await this.companyData.getByName(company.name)))
            throw new BadRequestException("Company with the same name already exists");

        return await this.companyData.update(company);
    }

    async leave(payload: JwtPayload) {
        if(!payload?.employer)
            throw new BadRequestException('You are not at the company');

        const company = await this.companyData.getCompanyById(payload.employer.companyId);
        if(!company)
            throw new NotFoundException('Company not found');

        if(company.owner_id == payload.sub) {
            const emplCount = await this.employerData.getCountByCompany(company.id);

            if(emplCount > 1)
                throw new BadRequestException('You are the owner of the company. You cannot leave it while it has employers');

            if(emplCount == 1){
                await this.companyData.delete(company.id);
                return;
            }   
        }

        await this.employerData.delete(payload.sub);
    }

}