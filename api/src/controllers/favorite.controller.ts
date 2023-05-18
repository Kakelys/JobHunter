import { Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { FavoriteService } from "src/services/favorite.service";
import { Page } from "src/shared/page.model";

@ApiTags('favorites')
@Controller('v1/favorites')
export class FavoriteController {

    constructor(private favService: FavoriteService) {}

    @UseGuards(JwtGuard)
    @Post('?')
    async create(@Req() req: Request, @Query('vacancy_id') vacancyId: number) {
        return await this.favService.create(req['payload'], vacancyId);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(@Req() req: Request, @Param('id') id: number) {
        return await this.favService.delete(req['payload'], id);
    }

    @UseGuards(JwtGuard)
    @Delete('?')
    async deleteByVacancy(@Req() req: Request, @Query('vacancy_id') id: number) {
        return await this.favService.deleteByVacancy(req['payload'], id);
    }

    @UseGuards(JwtGuard)
    @Get()
    async getByAccount(@Req() req: Request, @Query('page') page: number, @Query('to_take') toTake: number) {
        let pageObj = new Page(page, toTake);
        return await this.favService.getByAccount(req['payload'], pageObj);   
    }
}
