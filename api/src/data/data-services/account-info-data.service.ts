import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ProfileEdit } from "src/shared/account/profile-edit.model";


@Injectable()
export class AccountInfoDataService {

    constructor(private prisma: PrismaService) {}

    async update(accountId: number, accountInfo: ProfileEdit) {
        return await this.prisma.account_info.update({
            where: { id: +accountId },
            data: {
                name: accountInfo.name,
                website: accountInfo.website,
                about: accountInfo.about,
                email: accountInfo.email
            }
        });
    }



}