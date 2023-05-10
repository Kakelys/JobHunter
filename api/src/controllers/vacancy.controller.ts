import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { ReplyService } from "src/services";
import { VacancyService } from "src/services/vacancy.service";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { Page } from "src/shared/page.model";
import { VacancyNew } from "src/shared/vacancy/vacancy-new.model";

@ApiTags("Vacancy")
@Controller("v1/vacancies")
export class VacancyController {

    constructor(
        private vacancyService: VacancyService,
        private replyService: ReplyService){}

    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() vacancy: VacancyNew, @Req() req: Request){
        const payload :JwtPayload = req["payload"];
        vacancy.ownerId = payload.sub;
        vacancy.companyId = payload?.employer?.companyId;

        return this.vacancyService.create(vacancy);
    }

    @Get(":id")
    async getDetail(@Param('id') id: number) {
        return this.vacancyService.getDetail(id);
    }

    @Get("?")
    async get(@Query('page') page: number, @Query('to_take') toTake: number, @Query('serach') search: string) {
        let pageObj = new Page(page, toTake);
        return await this.vacancyService.getListDetails(pageObj, search);
    }

    @UseGuards(JwtGuard)
    @Get(':id/replies?')
    async getReplies(@Param('id') id: number, @Req() req: Request, @Query('page') page: number, @Query('to_take') toTake: number) {
        let pageObj = new Page(page, toTake);
        return this.replyService.getByVacancy(req['payload'], id, pageObj);
    }

    @UseGuards(JwtGuard)
    @Get(':id/replies/count')
    async getRepliesCount(@Param('id') id: number, @Req() req: Request) {
        return this.replyService.getCountByVacancy(req['payload'], id);
    }
}