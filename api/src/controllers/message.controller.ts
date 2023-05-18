import { Controller, Post, Get, Put, UseGuards, Body, Req, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';
import { MessageService } from 'src/services/message.service';
import { MessageNew } from 'src/shared/message/message-new.model';
import { Page } from 'src/shared/page.model';


@ApiTags('messages')
@Controller('v1/messages')
export class MessageController {
    
    constructor(private messageService: MessageService) {}

    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() msg: MessageNew,  @Req() req: Request) {
        return await this.messageService.create(req['payload'], msg);
    }

    @UseGuards(JwtGuard)
    @Get('?')
    async getMessages(
        @Query('account_id') accountId: number,
        @Query('page') page: number,
        @Query('to_take') toTake: number,
        @Query('diff') diff: number,
        @Req() req: Request) {
        let pageObj = new Page(page, toTake);
        return await this.messageService.getMessages(req['payload'], accountId, pageObj, diff);
    }

    @UseGuards(JwtGuard)
    @Get('chats?')
    async getChats(@Req() req: Request, @Query('page') page: number, @Query('to_take') toTake: number) {
        let pageObj = new Page(page, toTake);
        return await this.messageService.getChats(req['payload'], pageObj);
    }
}