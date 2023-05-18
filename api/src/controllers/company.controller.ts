import { EmployerService } from './../services/employer.service';
import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { CompanyService } from "src/services/company.service";
import { CompanyNew } from "src/shared/company/company-new.model";
import { CompanyResponse } from "src/shared/company/company-response.model";
import { CompanyEdit } from "src/shared/company/company-edit.model";
import { VacancyService } from "src/services/vacancy.service";
import { Page } from "src/shared/page.model";
import { InviteService } from "src/services/invite.service";

@ApiTags("company")
@Controller("v1/companies")
export class CompanyController {

    constructor(
        private companyService: CompanyService,
        private empService: EmployerService,
        private vacancyService: VacancyService,
        private inviteService: InviteService) {}

    @Get(":id")
    async get(@Param('id') id: number) {
        return await this.companyService.getById(id);
    }

    @Get(":id/employers?")
    async getEmployers(
        @Param('id') id: number,
        @Query('page') page: number,
        @Query('to_take') toTake: number,
        ) {
        let pageObj = new Page(page, toTake);
        return await this.empService.getEmployers(id, pageObj);
    }

    @Get(":id/employers/count")
    async getEmployersCounts(@Param('id') id: number) {
        return await this.empService.getEmployersCount(id);
    }

    @Get(":id/vacancies?")
    async getVacanciesCounts(
        @Param('id') id: number,
        @Query('page') page: number,
        @Query('to_take') toTake: number,
        ) {
        let pageObj = new Page(page, toTake);
        return await this.vacancyService.getByCompany(id, pageObj);
    }

    @UseGuards(JwtGuard)
    @Get(':id/invites?')
    async getInvites(
        @Param('id') id: number,
        @Query('page') page: number,
        @Query('to_take') toTake: number,
        @Req() req: Request) {
        let pageObj = new Page(page, toTake);
        return await this.inviteService.getByCompany(req['payload'], id, pageObj);
    }

    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() dto: CompanyNew, @Req() req: Request) {
        return this.companyService.create(req['payload'].sub, dto);
    }

    @UseGuards(JwtGuard)
    @Post('leave')
    async leave(@Req() req: Request) {
        return await this.companyService.leave(req['payload']);
    }

    @UseGuards(JwtGuard)
    @Put(":id")
    async update(@Param('id') id, @Body() dto: CompanyEdit, @Req() req: Request) {
        dto.companyId = id;
        return this.companyService.update(req['payload'].sub, dto);
    }
}