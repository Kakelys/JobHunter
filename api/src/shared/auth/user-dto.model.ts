import { JwtDto } from "./jwt.model";
import { Employer } from "../employer-response.model";

export class UserDto {
    id: number;
    name: string;
    isAdmin: boolean;
    employer: Employer;
    jwt: JwtDto
}