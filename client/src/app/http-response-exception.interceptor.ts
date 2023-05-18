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
              if (Array.isArray(err.error.message)) {
                return throwError(err.error.message.join('\n'));
              }

              if (err.error.message) {
                return throwError(err.error.message);
              }

              break;
            case 401: return throwError("Unauthorized");
            case 403: return throwError(err.error.message ? err.error.message : "Access denied");
            case 500: return throwError("Something went wrong(");
          }
        }

        return throwError('Something went wrong');
      })
    );
  }
}
