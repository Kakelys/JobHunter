import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { jwtConstants } from './shared/auth/jwt-constants';
import { JwtModule } from '@nestjs/jwt';
import { AccountController, AuthController, CompanyController, EmployerController, FavoriteController, InviteController, MessageController, ReplyController, TestController, VacancyController } from './controllers';
import { AccountDataService, AccountInfoDataService, CompanyDataService, EmployerDataService, FavoriteDataService, InviteDataService, MessageDataService, ReplyDataService, TokenDataService, VacancyDataService } from './data/data-services';
import { AccountService, AuthService, CompanyService, EmployerService, InviteService, MessageService, ReplyService, VacancyService } from './services';
import { FavoriteService } from './services/favorite.service';
import { TokenService } from './services/token.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        PrismaModule,
        ChatModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret
        }), 
    ],
    controllers: [
      TestController,
      AuthController,
      CompanyController,
      VacancyController,
      AccountController,
      InviteController,
      MessageController,
      ReplyController,
      FavoriteController,
      EmployerController
    ],
    providers: [
        AppService,
        TokenDataService,
        CompanyDataService,
        EmployerDataService,
        VacancyDataService,
        EmployerDataService,
        AccountDataService,
        AccountInfoDataService,
        InviteDataService,
        MessageDataService,
        ReplyDataService,
        FavoriteDataService,
        TokenService,
        AuthService,
        CompanyService,
        VacancyService,
        EmployerService,
        AccountService,
        InviteService,
        MessageService,
        ReplyService,
        FavoriteService,
    ]
})
export class AppModule {}
