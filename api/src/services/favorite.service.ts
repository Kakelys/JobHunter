import { ForbiddenException, Injectable } from "@nestjs/common";
import { FavoriteDataService } from "src/data/data-services";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { Page } from "src/shared/page.model";

@Injectable()
export class FavoriteService {
 
    constructor(
        private favoriteData: FavoriteDataService,
    ) {}

    async create(payload: JwtPayload, vacancyId: number) {
        let fav = await this.favoriteData.getByAccountAndVacancy(payload.sub, vacancyId);

        // If use already add it to favorite list he get 'success' message insted of 'already added'
        if(fav)
            return null;

        return await this.favoriteData.create(payload.sub, vacancyId);
    }
    
    async delete(payload: JwtPayload, favoriteId: number) {
        const fav = await this.favoriteData.getById(favoriteId);

        if(fav.account_id !== payload.sub)
            throw new ForbiddenException("You are not allowed to delete this");

        return await this.favoriteData.delete(favoriteId);
    }

    async deleteByVacancy(payload: JwtPayload, vacancyId: number) {
        const fav = await this.favoriteData.getByAccountAndVacancy(payload.sub, vacancyId);

        // If already deleted return, that success
        if(!fav)
            return null;

        return await this.favoriteData.delete(fav.id);
    }

    async getByAccount(payload: JwtPayload, page: Page) {
        return await this.favoriteData.getByAccount(payload.sub, page);
    }
}