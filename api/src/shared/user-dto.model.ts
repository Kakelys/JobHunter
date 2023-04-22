import { JwtDto } from "./jwt.model";

export class UserDto {
    id: number;
    is_admin: boolean;
    jwt: JwtDto
}