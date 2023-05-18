import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { AccountDataService } from "src/data/data-services/account-data.service";
import { EmployerDataService } from "src/data/data-services/employer-data.service";
import { InviteDataService } from "src/data/data-services/invite-data.service";
import { PrismaService } from "src/data/prisma.service";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { InviteNew } from "src/shared/invite/invite-new.model";
import { Page } from "src/shared/page.model";


@Injectable()
export class InviteService {

    constructor(
        private inviteData: InviteDataService,
        private accountData: AccountDataService,
        private emloyerData: EmployerDataService,
        private prisma: PrismaService) {}

    async create(data: InviteNew) {
        const invitedUser = await this.accountData.getById(data.accountId);

        if(data.inviter.employer.companyId == invitedUser?.employer?.company_id)
            throw new BadRequestException('This person already in your company');

        if(!data.inviter.employer.isHr)
            throw new ForbiddenException('Only HR can invite people');

        const accountInvites = await this.inviteData.getByCompanyAndAccount(data.accountId, data.inviter.employer.companyId, {page: 1, toTake: 1});

        if(accountInvites.length > 0)
            throw new BadRequestException('This person already invited');

        return await this.inviteData.create(data);
    }

    async delete(payload: JwtPayload, inviteId: number) {
        const invite = await this.inviteData.getById(inviteId);

        // only invited user can 'refuse' invite, or any hr from the company
        if (invite.account_id != payload.sub &&
            (invite.company_id == payload?.employer?.companyId && !payload?.employer?.isHr)) 
            throw new ForbiddenException('You are not allowed to delete this invite');

        await this.inviteData.delete(inviteId);
    }

    async acceptInvite(payload: JwtPayload, inviteId: number) {
        const invite = await this.inviteData.getById(inviteId);

        if(payload.sub != invite.account_id)
            throw new ForbiddenException('You are not allowed to accept this invite');

        if(payload?.employer)
            throw new ForbiddenException('Before accepting invite you need to leave your current company');

        return await this.prisma.$transaction(async _ => {
            await this.inviteData.delete(inviteId);
            await this.emloyerData.create(invite.company_id, invite.account_id);
        })
    }

    async getByCompany(payload: JwtPayload, companyId: number, page: Page) {
        if(!payload?.employer?.isHr || payload?.employer?.companyId != companyId)
            throw new ForbiddenException('You are not allowed to see invites');

        return await this.inviteData.getByCompany(companyId, page);
    }

    async getByAccount(payload: JwtPayload, page: Page) {
        return await this.inviteData.getByAccount(payload.sub, page);
    }

    async getCountByAccount(payload: JwtPayload) {
        return await this.inviteData.getCountByAccount(payload.sub);
    }

    async getCountByCompany(payload: JwtPayload) {
        if(!payload.employer.isHr)
            throw new ForbiddenException('Only HR can see invites');

        return await this.inviteData.getCountByCompany(payload.employer.companyId);
    }
}