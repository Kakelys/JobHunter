import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'wer' })
    @IsNotEmpty()
    @MaxLength(30)
    @MinLength(3)
    @Matches(new RegExp('[A-Za-z0-9]+(\s[A-Za-z0-9]+)*'), {
        message: 'Username must contain only eng. characterters|digitals and spaces between words'
    })
    name: string;

    @ApiProperty({example: 'wer'})
    @IsNotEmpty()
    @Matches(new RegExp('[A-Za-z0-9]'), {
        message: 'Login must contains only eng. characters and digitals'
    })
    username: string;

    @ApiProperty({example: 'werwerwer'})
    @Matches(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{4,}$'), {
        message: 'Password must contain at least 1 upper case letter, 1 lower case letter, 1 number'
    })
    @MinLength(4)
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: 'test@gmail.com'})
    email: string;
}
