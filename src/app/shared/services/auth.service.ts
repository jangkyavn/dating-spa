import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserForLogin } from '../models/user-for-login';
import { UserForRegister } from '../models/user-for-register';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:44361/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: UserForLogin) {
    return this.http.post(this.baseUrl + 'login', model, httpOptions).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: UserForRegister) {
    return this.http.post(this.baseUrl + 'register', model, httpOptions);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
