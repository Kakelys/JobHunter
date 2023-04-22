import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    const accessToken = localStorage.getItem('access-token');
    if (!accessToken) return next.handle(req);

    const modifiedReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + accessToken),
    });

    return next.handle(modifiedReq).pipe(
      catchError((err) => {
        localStorage.removeItem('access-token');

        // If it's Unauthorized try to refresh tokens and resend request
        if(err instanceof HttpErrorResponse && err.status === 401) {
          if(!localStorage.getItem('refresh-token')) {
            return throwError(err);
          }

          var tmp = this.authService.autoAuth().subscribe({
            next: _ => {return next.handle(modifiedReq)},
            error: _ => {return throwError(new Error('Failed to login'))}
          });
        }

        return throwError(err);
      })
    );
  }
}
