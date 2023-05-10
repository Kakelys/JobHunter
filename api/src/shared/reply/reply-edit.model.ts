import { reply_status } from "@prisma/client";
import { IsEnum } from "class-validator";

export class ReplyEdit {
    @IsEnum(reply_status, {message: 'Invalid status'})
    status: reply_status;
}