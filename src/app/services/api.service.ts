import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public info(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>('/api/vendor-request/info', { observe: 'response' })
      .pipe(
        map(user => {
          return user;
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  public calculate(calculateData: any): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>('/api/customer/calculate-payment-plan', calculateData, { observe: 'response' })
      .pipe(
        map(user => {
          return user;
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
  }

}
