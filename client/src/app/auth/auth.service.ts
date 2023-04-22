import { User } from './../../shared/user.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Register } from "src/shared/register.model";
import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "src/shared/auth-response.model";
import { Login } from 'src/shared/login.model';

@Injectable()
export class AuthService {
  private user = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();

  private baseUrl = "http://localhost:3000/v1/auth";

  constructor(private http: HttpClient) {}

  register(registerDto: Register) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, registerDto)
      .pipe(tap(this.handleAuth));
  }

  login(loginDto: Login) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginDto)
      .pipe(tap(data => this.handleAuth(data)));
  }

  logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');

    this.user.next(null);
  }

  autoAuth() {
    const refreshToken = localStorage.getItem('refresh-token');
    if(!refreshToken)
      return;

    return this.http.post<AuthResponse>(`${this.baseUrl}/auth`, {refreshToken})
      .pipe(tap(data => this.handleAuth(data)))
  }

  private handleAuth(res: AuthResponse) {
    console.log(res);
    if(!res)
      return;
    localStorage.setItem('access-token', res.jwt.accessToken);
    localStorage.setItem('refresh-token', res.jwt.refreshToken);

    this.user.next({id: res.id, is_admin: res.is_admin});
  }
}
