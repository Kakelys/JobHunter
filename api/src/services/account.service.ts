import { AccountInfoDataService } from './../data/data-services/account-info-data.service';
import { AccountDataService } from './../data/data-services/account-data.service';
import { Injectable } from "@nestjs/common";
import { ProfileEdit } from 'src/shared/account/profile-edit.model';

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