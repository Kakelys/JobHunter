import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "src/shared/auth/jwt-payload.model";
import { MessageNew } from "src/shared/message/message-new.model";
import { MessageResponse } from "src/shared/message/message-response.model";
import { Page } from "src/shared/page.model";
import { PrismaService } from "../prisma.service";
import { Message } from "src/chat/message.model";

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

    async getChats(payload: JwtPayload, page: Page)  {
        //getting x2 messsages to get last message from each chat
        let lastMessages = await this.prisma.message.findMany({
            orderBy: {
                date: 'desc'
            },
            where: {
                OR: [
                    {from_id: +payload.sub},
                    {to_id: +payload.sub},
                ]
            },
            distinct: ['from_id', 'to_id'],
            take: page.page*page.toTake*2,
            select: {
                id: true,
                text: true,
                from_id: true,
                to_id: true,
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
                },
                accountTo: {
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
        
        // top 1 weirdest code in this course work
        // and probably will not work if message in different chats updates
        // better way - create new table many to many - chats
        for(let i = 0; i < lastMessages.length; i++) {
            let to = lastMessages[i].to_id;
            let from = lastMessages[i].from_id;

            //deleting reverse duplicats 
            for(let j = 0; j < lastMessages.length; j++) {
                if(lastMessages[j].from_id == to && lastMessages[j].to_id == from && lastMessages[j].from_id != lastMessages[j].to_id) {
                    lastMessages.splice(j, 1);
                    j--;
                }
            }
        }
        
        const res = lastMessages.slice((page.page - 1)*page.toTake, (page.page)*page.toTake).map(message => {
            return {
                id: message.id,
                text: message.text,
                date: message.date,
                from: {
                    id: message.accountFrom.id,
                    name: message.accountFrom.accountInfo.name
                },
                to: {
                    id: message.accountTo.id,
                    name: message.accountTo.accountInfo.name
                }
            }
        });

        if(res.length == 0)
            return null;
            
        return res;
    }

    async getMessages(payload: JwtPayload, accountId: number, page: Page, diff:number) : Promise<MessageResponse[]> {
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
                date: 'desc'
            },
            skip: ((+page.page - 1) * +page.toTake) + (+diff),
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