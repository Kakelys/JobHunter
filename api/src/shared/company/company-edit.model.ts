import { Matches } from "class-validator";

export class CompanyEdit {
    companyId: number;
    @Matches(new RegExp('[A-Za-z0-9]+(\s[A-Za-z0-9]+)*'), {
        message: 'Company name must contain only eng. characterters|digitals and spaces between words'
    })
    name: string;
    about: string;
    website: string;
    phone: string;
}