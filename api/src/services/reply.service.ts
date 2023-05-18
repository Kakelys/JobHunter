import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { reply_status } from "@prisma/client";
import { ReplyDataService } from "src/data/data-services/reply-data.service";
import { VacancyDataService } from "src/data/data-services/vacancy-data.service";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { Page } from "src/shared/page.model";

@Injectable()
export class ReplyService {

    constructor(
        private replyData: ReplyDataService,
        private vacancyData: VacancyDataService) {}

    async create(payload: JwtPayload, vacancyId: number) {
        const reply = await this.replyData.getByAccountAndVacancy(payload.sub, vacancyId);

        const vacancy = await this.vacancyData.getById(vacancyId);
        if(!vacancy)
            throw new NotFoundException('Vacancy not found');

        if(reply)
            throw new BadRequestException('You have already replied to this vacancy');

        if(!vacancy.is_active)
            throw new BadRequestException('The vacancy is closed');

        await this.replyData.create(payload, vacancyId);
    }

    async update(payload: JwtPayload, replyId: number, status: reply_status) {
        const reply = await this.replyData.getById(replyId);

        if(!reply)
            throw new NotFoundException('Reply not found');

        //only hr can update replies state
        if(reply.vacancy.company_id != payload.employer.companyId || !payload.employer.isHr)
            throw new ForbiddenException('You are not allowed to update this reply');

        await this.replyData.update(replyId, status);
    }

    async getByVacancy(payload: JwtPayload, vacancyId: number, page: Page) {
        const vac = await this.vacancyData.getById(vacancyId);

        if(!vac)
            throw new NotFoundException('Vacancy not found');
        
        if(vac.company.id != payload.employer.companyId ||
            vac.company.id == payload.employer.companyId && !payload.employer.isHr)
            throw new ForbiddenException('You are not allowed to view this vacancy replies');
        
        return await this.replyData.getByVacancy(vacancyId, page);
    }

    async getCountByVacancy(payload: JwtPayload, vacancyId: number) {
        const vac = await this.vacancyData.getById(vacancyId);

        if(!vac)
            throw new NotFoundException('Vacancy not found');
        
        if(vac.company.id != payload.employer.companyId ||
            vac.company.id == payload.employer.companyId && !payload.employer.isHr)
            throw new ForbiddenException('You are not allowed to view this vacancy replies');

        return await this.replyData.getCountByVacancy(vacancyId);
    }

    async getByAccount(payload: JwtPayload, page: Page) {
        return await this.replyData.getByAccount(payload.sub, page);
    }

}