import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class EmployerDataService {

    constructor(private prisma: PrismaService) {}

    async getByAccountId(id: number) {
        return await this.prisma.employer.findFirst({
            where: {
                account_id: id
            }
        });
    }
}