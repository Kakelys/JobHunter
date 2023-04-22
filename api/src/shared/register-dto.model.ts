import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'wer' })
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(3)
    name: string;

    @ApiProperty({example: 'wer'})
    @IsNotEmpty()
    username: string;

    @ApiProperty({example: 'werwerwer'})
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: 'test@gmail.com'})
    email: string;
}
