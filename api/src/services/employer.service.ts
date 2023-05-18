import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { EmployerDataService } from "src/data/data-services/employer-data.service";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { Page } from "src/shared/page.model";


@Injectable() 
export class EmployerService{
 
    constructor(private employerData: EmployerDataService){}
    
    async getEmployers(companyId: number, page: Page) {
        return await this.employerData.getByCompany(companyId, page);
    }

    async getEmployersCount(companyId: number) {
        return await this.employerData.getCountByCompany(companyId);
    }

    async kick(payload: JwtPayload, accountId: number) {
        const employer = await this.employerData.getByAccountId(accountId);
        if(!employer)
            throw new NotFoundException('Emploeer not found');

        if(
            employer.company_id != payload?.employer?.companyId 
            || !payload?.employer?.isHr
            || accountId == payload?.sub
            || accountId == employer.company.owner_id)
            throw new ForbiddenException('You are not allowed to kick this user');

        await this.employerData.delete(accountId);
    }

    async updateStatus(payload: JwtPayload, accountId: number, isHr: string) {
        const employer = await this.employerData.getByAccountId(accountId);
        if(!employer)
            throw new NotFoundException('Emploeer not found');

        if(
            employer.company_id != payload?.employer?.companyId 
            || payload.sub != employer.company.owner_id
            || payload.sub == accountId)
            throw new ForbiddenException('You are not allowed to change status of');

        await this.employerData.update(accountId, isHr);
    }

}