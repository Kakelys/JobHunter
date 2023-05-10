import { ForbiddenException, Injectable } from "@nestjs/common";
import { VacancyDataService } from "src/data/data-services/vacancy-data.service";
import { Page } from "src/shared/page.model";
import { VacancyNew } from "src/shared/vacancy/vacancy-new.model";

@Injectable()
export class VacancyService {

    constructor(private vacancyData: VacancyDataService){}

    async create(vacancy: VacancyNew) {
        if(!vacancy.companyId)
            throw new ForbiddenException("You are not allowed to create vacancies");

        return await this.vacancyData.create(vacancy);
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