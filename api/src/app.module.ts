import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { jwtConstants } from './shared/jwt-constants';
import { JwtModule } from '@nestjs/jwt';
import { TestController } from './controllers/test.controller';
import { AuthController } from './controllers/auth.controller';
import { TokenService } from './services/token.service';
import { TokenDataService } from './data/data-services/token-data.service';
import { AccountDataService } from './data/data-services/account-data.service';
import { AuthService } from './services/auth.service';
import { CompanyController } from './controllers/company.controller';
import { CompanyDataService } from './data/data-services/company-data.service';
import { CompanyService } from './services/company.service';
import { EmployerDataService } from './data/data-services/employer-data.service';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret
        }), 
    ],
    controllers: [
      AppController, 
      TestController,
      AuthController,
      CompanyController
    ],
    providers: [
        AppService,
        TokenService,
        TokenDataService,
        AuthService,
        AccountDataService,
        CompanyDataService,
        EmployerDataService,
        CompanyService
    ]
})
export class AppModule {}
