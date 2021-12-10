import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(loginData: any): Observable<HttpResponse<any>> {

    let body = {
      "username": loginData.username,
      "password": loginData.password
    }

    return this.http.post<HttpResponse<any>>('/api/authenticate', body, { observe: 'response' })
      .pipe(
        map(user => {
          localStorage.setItem('token', user.body['idToken']);
          return user;
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
  }
}
