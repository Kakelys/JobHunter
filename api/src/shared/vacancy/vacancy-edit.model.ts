import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MaxLength } from "class-validator";

export class VacancyEdit {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(new RegExp('[A-Za-z0-9!@#$%^&()]+(\s[A-Za-z0-9!@#$%^&()]+)*'), {
        message: 'Vacancy title must contain only eng. characterters|digitals and spaces between words'
    })
    title: string;
    @ApiProperty()
    @MaxLength(10000)
    description: string;
    salary: string;
    isActive: boolean;
}
  