import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { MessageNew } from "src/shared/message/message-new.model";
import { MessageResponse } from "src/shared/message/message-response.model";
import { Page } from "src/shared/page.model";
import { PrismaService } from "../prisma.service";

@Injectable()
export class MessageDataService {

    constructor(private prisma: PrismaService) {}

    async create(payload: JwtPayload, msg: MessageNew) {
        return await this.prisma.message.create({
            data: {
                from_id: +payload.sub,
                to_id: +msg.accountId,
                text: msg.message
            }
        });
    }

    async getMessages(payload: JwtPayload, accountId: number, page: Page) : Promise<MessageResponse[]> {
        const messages = await this.prisma.message.findMany({
            where: {
                OR: [
                    {
                        from_id: +accountId,
                        to_id: +payload.sub
                    },
                    {
                        from_id: +payload.sub,
                        to_id: +accountId
                    }
                ]
            },
            orderBy: {
                date: 'asc'
            },
            skip: ((page.page - 1) * page.toTake),
            take: +page.toTake,
            select: {
                id: true,
                text: true,
                date: true,
                accountFrom: {
                    select: {
                        id: true,
                        accountInfo: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if(messages.length == 0)
            return null;

        return messages.map(message => {
            return {
                id: message.id,
                text: message.text,
                date: message.date,
                from: {
                    id: message.accountFrom.id,
                    name: message.accountFrom.accountInfo.name
                }
            }
        })
    }
}