import { Injectable } from "@nestjs/common";
import { MessageDataService } from "src/data/data-services/message-data.service";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { MessageNew } from "src/shared/message/message-new.model";
import { Page } from "src/shared/page.model";

@Injectable()
export class MessageService {
    
    constructor(private messageData: MessageDataService) {}

    async create(payload: JwtPayload, msg: MessageNew) {
        return await this.messageData.create(payload, msg);
    }

    async getMessages(payload: JwtPayload, accountId: number, page: Page) {
        return await this.messageData.getMessages(payload, accountId, page);
    }
    
}