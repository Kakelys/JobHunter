import { Controller, Delete, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { EmployerService } from "src/services";

@ApiTags('employers')
@Controller('v1/employers')
export class EmployerController {

    constructor(private emplService: EmployerService) {}

    @UseGuards(JwtGuard)
    @Delete(':id/kick')
    async kick(@Req() req: Request, @Param('id') id: number) {
        await this.emplService.kick(req['payload'], id);
    }

    @UseGuards(JwtGuard)
    @Put(':id/update-status?')
    async updateStatus(@Req() req: Request, @Param('id') id: number, @Query('is_hr') isHr: string) {
        await this.emplService.updateStatus(req['payload'], id, isHr);
    }

}