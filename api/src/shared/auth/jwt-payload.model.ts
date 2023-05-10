import { Employer } from "../employer-response.model";

export interface JwtPayload {
    sub: number;
    name: string;
    isAdmin: boolean;
    employer: Employer; 
    expiresIn: string | number
}