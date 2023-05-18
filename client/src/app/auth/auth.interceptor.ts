import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor  {

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {

    const accessToken = localStorage.getItem('access-token');
    if (!accessToken) return next.handle(req);

    let modifiedReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + accessToken),
    });

    return next.handle(modifiedReq).pipe(
      catchError((err) => {
        // If it's Unauthorized try to refresh tokens and resend request
        console.log(err);
        if(err instanceof HttpErrorResponse && err.status === 401) {
          localStorage.removeItem('access-token');
          if(!localStorage.getItem('refresh-token')) {
            this.authService.logout();
            return throwError(err);
          }

          return this.authService.autoAuth().pipe(
            switchMap(() => {
              const accessToken = localStorage.getItem('access-token');

              if (!accessToken)
                return next.handle(req);

              modifiedReq = req.clone({
                headers: req.headers.append('Authorization', 'Bearer ' + accessToken),
              });

              return next.handle(modifiedReq);
            }),
            catchError((err) => {
              if(err == "Unauthorized")
                this.authService.logout();
              return throwError(err);
            })
          );
        } else {
          return throwError(err);
        }


      })
    );
  }
}
