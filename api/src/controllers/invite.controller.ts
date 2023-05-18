import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { InviteService } from "src/services/invite.service";
import { InviteNew } from "src/shared/invite/invite-new.model";


@ApiTags('invites')
@Controller('v1/invites')
export class InviteController {

    constructor(
        private inviteService: InviteService, 
    ) {}

    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() data: InviteNew, @Req() req: Request) {
        data.inviter = req['payload'];

        return await this.inviteService.create(data);
    }
    
    @UseGuards(JwtGuard)
    @Post(':id/accept')
    async accept(@Req() req: Request, @Param('id') inviteId: number) {
        await this.inviteService.acceptInvite(req['payload'], inviteId);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(@Req() req: Request, @Param('id') inviteId: number) {
        await this.inviteService.delete(req['payload'], inviteId);
    }
    

}