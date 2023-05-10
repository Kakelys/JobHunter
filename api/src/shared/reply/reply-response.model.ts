import { reply_status } from "@prisma/client";

export class ReplyResponse {
    id: number;
    date: Date;
    status: reply_status;
    vacancy: {
        id: number;
        title: string;
    }
    account: {
        id: number;
        name: string;
    }
}
