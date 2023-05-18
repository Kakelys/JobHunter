import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class LoginDto {
    @ApiProperty({example: 'wer'})
    @IsNotEmpty()
    @Matches(new RegExp('[A-Za-z0-9]'), {
        message: 'Login must contains only eng. characters and digitals'
    })
    login: string;

    @ApiProperty({example: 'werwerwer'})
    @IsNotEmpty()
    password: string;
}