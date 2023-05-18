import { Body, Controller, ForbiddenException, Get, Param, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyDataService } from "src/data/data-services/company-data.service";
import { JwtGuard } from "src/guards/jwt.guard";
import { MessageService } from "src/services";
import { AccountService } from "src/services/account.service";
import { InviteService } from "src/services/invite.service";
import { ProfileEdit } from "src/shared/account/profile-edit.model";
import { Page } from "src/shared/page.model";

@ApiTags('account')
@Controller('v1/accounts')
export class AccountController {

    constructor(
        private accountService: AccountService,
        private inviteService: InviteService) {}

    @Get(':id') 
    async getByIdDetail(@Param('id') id: number) {
        return await this.accountService.getByIdDetail(id);
    }

    @UseGuards(JwtGuard)
    @Get(':id/invites?')
    async getByAccount(@Req() req: Request, @Query('page') page: number, @Query('to_take') toTake: number) {
        let pageObj = new Page(page, toTake);
        return await this.inviteService.getByAccount(req['payload'], pageObj);
    }

    @UseGuards(JwtGuard)
    @Get(':id/invites/count')
    async getCountByAccount(@Req() req: Request) {
        return await this.inviteService.getCountByAccount(req['payload']);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async updateProfile(
        @Param('id') id: number, 
        @Body() accountInfo: ProfileEdit, 
        @Req() req:Request
        ) {
        if(req['payload']?.sub != id)
            throw new ForbiddenException('You are not allowed to edit this profile');

        return await this.accountService.updateProfile(id, accountInfo);
    }

}