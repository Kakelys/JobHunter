import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { genSalt, hash,compare } from 'bcrypt';
import { JwtGuard } from "src/guards/jwt.guard";
import { jwtConstants } from "src/shared/auth/jwt-constants";
import { Test } from "src/shared/test.model";

@ApiTags('tests')
@Controller('test')
export class TestController {

    constructor(private jwtService: JwtService){}

    @Get('test-hash')
    async test() { 
        const salt = await genSalt(10);
        const passHash = await hash('test', salt)

        console.log(await compare('test', '$2b$10$wQCrJ718hnjmL5tL5MCYq.J7Gjue8J2o0gGHq5AHH4k.L6m57S1R.'));
        console.log(salt);
        console.log(passHash);
    }

    @Post('validation')
    async testValidation(@Body() test: Test) {   
        return {message: 'ok'};
    }

    @UseGuards(JwtGuard)
    @Get('auth')
    async testAuth() {
        return {message: 'ok'};
    }

}
