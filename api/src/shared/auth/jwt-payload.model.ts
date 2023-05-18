import { Employer } from "../employer/employer.model";

export interface JwtPayload {
    sub: number;
    name: string;
    isAdmin: boolean;
    employer: Employer; 
    expiresIn: string | number
}