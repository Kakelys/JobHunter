import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class CompanyNew {
    @ApiProperty({example: 'example name'})
    @IsNotEmpty()
    @Matches(new RegExp('[A-Za-z0-9]+(\s[A-Za-z0-9]+)*'), {
        message: 'Company name must contain only eng. characterters|digitals and spaces between words'
    })
    name: string;
}