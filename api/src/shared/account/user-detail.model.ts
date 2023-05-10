import { Company } from "../company/company-model";

export class UserDetail {
    id: number;
    name: string;
    website: string;
    about: string;
    company: Company;
}