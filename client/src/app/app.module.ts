import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpResponseException } from './http-response-exception.interceptor';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { CompanyComponent } from './company/company.component';
import { CompanyNewComponent } from './company/company-new/company-new.component';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { CompanyService } from './company/company.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CompanyNewGuard } from './company/company-new.guard';
import { CompanyElementComponent } from './company/company-element/company-element.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VacancyNewComponent } from './vacancy/vacancy-new/vacancy-new.component';
import { VacancyEditComponent } from './vacancy/vacancy-edit/vacancy-edit.component';
import { VacancyElementComponent } from './vacancy/vacancy-element/vacancy-element.component';
import { VacancyNewGuard } from './vacancy/vacancy-new.guard';
import { VacancyService } from './vacancy/vacancy.service';
import { VacancyListComponent } from './vacancy/vacancy-list/vacancy-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileService } from './user-profile/user-profile.service';
import { UserProfileEditComponent } from './user-profile/user-profile-edit/user-profile-edit.component';
import { UserInviteListComponent } from './user-profile/user-invite-list/user-invite-list.component';
import { AutoExpandDirective } from 'src/shared/auto-expand.directive';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { ChatModule } from './chat/chat.module';
import { VacancyReplyListComponent } from './vacancy/vacancy-reply-list/vacancy-reply-list.component';
import { SearchComponent } from './search/search.component';
import { SearchVacancyListComponent } from './search/search-vacancy-list/search-vacancy-list.component';

function autoAuthInit(authService: AuthService): () => Promise<any> {
  return async () => {
    await authService.autoAuth()?.subscribe();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompanyComponent,
    CompanyNewComponent,
    LoadingSpinnerComponent,
    CompanyElementComponent,
    HomeComponent,
    CompanyEditComponent,
    NotFoundComponent,
    VacancyNewComponent,
    VacancyEditComponent,
    VacancyElementComponent,
    VacancyListComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    UserInviteListComponent,
    VacancyReplyListComponent,
    SearchComponent,
    SearchVacancyListComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    ChatModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forChild([
      {path: '**', component: NotFoundComponent}
    ]),
  ],
  providers: [
    CompanyService,
    CompanyNewGuard,
    VacancyNewGuard,
    VacancyService,
    UserProfileService,
    {
      provide: APP_INITIALIZER,
      useFactory: autoAuthInit,
      deps: [AuthService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseException,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
