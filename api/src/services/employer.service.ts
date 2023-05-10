import { Injectable } from "@nestjs/common";
import { EmployerDataService } from "src/data/data-services/employer-data.service";


@Injectable() 
export class EmployerService{
 
    constructor(private employerData: EmployerDataService){}
    
    async getEmployersCount(companyId: number) {
        return await this.employerData.getCountByCompany(companyId);
    }

}