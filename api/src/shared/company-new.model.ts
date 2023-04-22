import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CompanyNew {
    @ApiProperty({example: 'example name'})
    @IsNotEmpty()
    name: string;
}