import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({example: 'wer'})
    @IsNotEmpty()
    login: string;

    @ApiProperty({example: 'werwerwer'})
    @IsNotEmpty()
    password: string;
}