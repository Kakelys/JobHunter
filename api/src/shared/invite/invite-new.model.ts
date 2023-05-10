import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";
import { JwtPayload } from "../auth/jwt-payload.model";

// validation need only for accountId, all other data will be taken from jwt payload
export class InviteNew {
    inviter: JwtPayload;

    @IsNotEmpty()
    @IsNumber()
    accountId: number;
}