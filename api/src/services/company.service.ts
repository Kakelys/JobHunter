import { EmployerDataService } from './../data/data-services/employer-data.service';
import { CompanyDataService } from 'src/data/data-services/company-data.service';
import { CompanyNew } from './../shared/company-new.model';
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CompanyService {

    constructor(private companyData: CompanyDataService,
        private employerData: EmployerDataService) {}

    async create(senderId: number, company: CompanyNew) {
        if(!(await this.employerData.getByAccountId(senderId))) {
            throw new BadRequestException("You already part of the company");
        }

        return await this.companyData.create(company.name, senderId);
    }

}