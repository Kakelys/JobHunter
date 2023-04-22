import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export class HttpResponseException implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                let errors = [];

                Object.keys(err.error.errors).forEach(key => {
                  errors.push(err.error.errors[key][0]);
                });

                return throwError(errors.join('\n'));
              }

              if (err.error) {
                return throwError(err.error);
              }
            case 401: return throwError(err);
            case 403: return throwError("Access denied");
            case 500: return throwError("Internal server error");
          }
        }

        return throwError('Something went wrong');
      })
    );
  }
}
