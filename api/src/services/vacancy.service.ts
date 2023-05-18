import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { VacancyDataService } from "src/data/data-services/vacancy-data.service";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { Page } from "src/shared/page.model";
import { VacancyEdit } from "src/shared/vacancy/vacancy-edit.model";
import { VacancyNew } from "src/shared/vacancy/vacancy-new.model";

@Injectable()
export class VacancyService {

    constructor(private vacancyData: VacancyDataService){}

    async create(payload: JwtPayload, vacancy: VacancyNew) {
        if(!payload?.employer?.companyId || !payload?.employer?.isHr)
            throw new ForbiddenException("You are not allowed to create vacancy");

        return await this.vacancyData.create(payload.sub, payload.employer.companyId, vacancy);
    }

    async update(payload: JwtPayload, vacancyId: number, vacancy: VacancyEdit) {
        const vac = await this.vacancyData.getById(vacancyId);

        if(!payload?.employer.isHr || vac?.company.id != payload?.employer.companyId)
            throw new ForbiddenException("You are not allowed to update this vacancy");

        return await this.vacancyData.update(vacancyId, vacancy);
    }

    async delete(payload: JwtPayload, vacancyId: number) {
        const vac = await this.vacancyData.getById(vacancyId);

        if(!vac)
            throw new NotFoundException("Vacancy not found");

        if(!payload?.employer.isHr || vac.company.id != payload?.employer.companyId)
            throw new ForbiddenException("You are not allowed to delete this vacancy");

        return await this.vacancyData.delete(vacancyId);
    }

    async getDetail(vacancyId: number) {
        return await this.vacancyData.getDetail(vacancyId);
    }

    async getListDetails(page: Page, search: string) {
        return await this.vacancyData.getListDetails(page, search);
    }

    async getByCompany(companyId: number, page: Page) {
        return await this.vacancyData.getByCompany(companyId, page);
    }

    async getCountByCompany(companyId: number) {
        return await this.vacancyData.countByCompany(companyId);
    }


}