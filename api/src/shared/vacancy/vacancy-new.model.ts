import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class VacancyNew {
    ownerId: number;
    companyId: number;
    @ApiProperty()
    @Matches(new RegExp('[A-Za-z0-9!@#$%^&()]+(\s[A-Za-z0-9!@#$%^&()]+)*'), {
        message: 'Vacancy title must contain only eng. characterters|digitals and spaces between words'
    })
    title: string;
    salary: string;
    @ApiProperty()
    description: string;
}