import { HttpHandler,HttpInterceptor,HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
    )
  }

}