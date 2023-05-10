import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { jwtConstants } from './shared/auth/jwt-constants';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { TokenDataService } from './data/data-services/token-data.service';
import { AccountDataService } from './data/data-services/account-data.service';
import { AuthService } from './services/auth.service';
import { CompanyDataService } from './data/data-services/company-data.service';
import { CompanyService } from './services/company.service';
import { EmployerDataService } from './data/data-services/employer-data.service';
import { VacancyDataService } from './data/data-services/vacancy-data.service';
import { VacancyService } from './services/vacancy.service';
import { EmployerService } from './services/employer.service';
import { AccountService } from './services/account.service';
import { AccountInfoDataService } from './data/data-services/account-info-data.service';
import { InviteService } from './services/invite.service';
import { InviteDataService } from './data/data-services/invite-data.service';
import { InviteController } from './controllers/invite.controller';
import { MessageDataService } from './data/data-services/message-data.service';
import { MessageService } from './services/message.service';
import { AccountController, AuthController, CompanyController, MessageController, ReplyController, TestController, VacancyController } from './controllers';
import { ReplyDataService } from './data/data-services';
import { ReplyService } from './services';

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
      CompanyController,
      VacancyController,
      AccountController,
      InviteController,
      MessageController,
      ReplyController,
    ],
    providers: [
        AppService,
        TokenDataService,
        AccountDataService,
        CompanyDataService,
        EmployerDataService,
        VacancyDataService,
        EmployerDataService,
        AccountDataService,
        AccountInfoDataService,
        InviteDataService,
        MessageDataService,
        ReplyDataService,
        TokenService,
        AuthService,
        CompanyService,
        VacancyService,
        EmployerService,
        AccountService,
        InviteService,
        MessageService,
        ReplyService,
    ]
})
export class AppModule {}
