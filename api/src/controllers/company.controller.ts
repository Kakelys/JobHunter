import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyService } from "src/services/company.service";

@ApiTags("company")
@Controller("v1/company")
export class CompanyController {

    constructor(private companyService: CompanyService) {}

}