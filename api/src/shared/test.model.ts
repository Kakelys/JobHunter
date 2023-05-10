import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class Test {
    @ApiProperty()
    @IsNotEmpty({message: 'some value is required'})
    someValue: number;

    @ApiProperty()
    @IsNotEmpty({message: 'another value is required'})
    anotherValue: string;
}