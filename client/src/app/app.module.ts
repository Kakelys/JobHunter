import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpResponseException } from './http-response-exception.interceptor';
import { HTTP_INTERCEPTORS, HttpErrorResponse} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { FavoriteModule } from './favorite/favorite.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { CompanyModule } from './company/company.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AppRoutingModule } from './app-routing.module';

// This function is used to automatically authenticate the user when the app starts.
// before i used await and subscribe, but it didn't waiting for the result of autoAuth()
function autoAuthInit(authService: AuthService): () => Promise<any> {
  return  async () => {
    let logged = authService.plugLoad();

    if(logged) {
      try{
        await authService.autoAuth().toPromise();
      } catch (err) {
        if(err == "Unauthorized")
        authService.logout();
      }
    }


    return;
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    ChatModule,
    FavoriteModule,
    VacancyModule,
    CompanyModule,
    UserProfileModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      {path: '**', component: NotFoundComponent}
    ]),
  ],
  providers: [
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
