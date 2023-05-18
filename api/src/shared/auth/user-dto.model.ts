import { Employer } from "../employer/employer.model";
import { JwtDto } from "./jwt.model";

export class UserDto {
    id: number;
    name: string;
    isAdmin: boolean;
    employer: Employer;
    jwt: JwtDto
}