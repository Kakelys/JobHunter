import { AccountInfoDataService } from './../data/data-services/account-info-data.service';
import { AccountDataService } from './../data/data-services/account-data.service';
import { BadRequestException, Injectable } from "@nestjs/common";
import { ProfileEdit } from 'src/shared/account/profile-edit.model';
import { MessageDataService } from 'src/data/data-services';
import { Page } from 'src/shared/page.model';
import { JwtPayload } from 'src/shared/auth/jwt-payload.model';

@Injectable()
export class AccountService {

    constructor(
        private accountData: AccountDataService,
        private accountProfileData: AccountInfoDataService) {}

    async getByIdDetail(id: number) {
        return await this.accountData.getByIdDetail(id);
    }

    async updateProfile (accountId: number, accountInfo: ProfileEdit) {
        return await this.accountProfileData.update(accountId, accountInfo);
    }

}