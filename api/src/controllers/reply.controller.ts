import { Body, Controller, Param, Post, Put, Query, Req, UseGuards,  } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { reply_status } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";
import { JwtGuard } from "src/guards/jwt.guard";
import { ReplyService } from "src/services/reply.service";
import { ReplyEdit } from "src/shared/reply/reply-edit.model";

@ApiTags('replies')
@Controller('v1/replies')
export class ReplyController {

    constructor(private replyService: ReplyService) {}

    @UseGuards(JwtGuard)
    @Post('?')
    async create(@Query('vacancy_id') vacancyId: number, @Req() req: Request) {
        return await this.replyService.create(req['payload'], vacancyId);
    }

    @UseGuards(JwtGuard)
    @Put(':id?')
    async update(@Param('id') vacancyId: number, @Req() req: Request, @Body() replyEdit: ReplyEdit) {
        return await this.replyService.update(req['payload'], vacancyId, replyEdit.status);
    }
}