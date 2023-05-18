import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { Register } from "src/shared/register.model";
import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "src/shared/auth-response.model";
import { Login } from 'src/shared/login.model';
import { User } from "src/shared/user.model";
import { environment as env } from "src/environments/environment";
import { WebsocketChatService } from "../chat/websocket/websocket-chat.service";

@Injectable()
export class AuthService {
  private user = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();

  private baseUrl = env.apiUrl + "v1/auth";

  constructor(private http: HttpClient,
    private socketService: WebsocketChatService) {}

  register(registerDto: Register) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, registerDto)
      .pipe(tap(data => this.handleAuth(data)));
  }

  login(loginDto: Login) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginDto)
      .pipe(tap(data => this.handleAuth(data)));
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('plug-user-data');

    this.socketService.disconnect();

    this.user.next(null);
  }

  autoAuth() {
    const refreshToken = localStorage.getItem('refresh-token');
    //returning empty observable so that the app doesn't crash on .subscribe()
    if(!refreshToken)
      return of(null)

    return this.http.post<AuthResponse>(`${this.baseUrl}/auth`, {refreshToken})
      .pipe(tap(data => this.handleAuth(data)))
  }

  plugLoad() : Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh-token');
    if(!refreshToken) {
      return Promise.resolve(false);
    }

    let userData = localStorage.getItem('plug-user-data');

    if(userData) {
      try {
        let user = JSON.parse(userData);
        this.user.next(user);
      } catch {
        console.error('Error parsing user data');
      }
    }
    else {
      this.user.next({id: -1, isAdmin: false, employer: null, name: 'Loading...'});
    }

    return Promise.resolve(true);;
  }

  private handleAuth(res: AuthResponse) {
    if(!res) {
      console.log('not auto auth');
      this.user.next(null);
      return;
    }

    localStorage.setItem('access-token', res.jwt.accessToken);
    localStorage.setItem('refresh-token', res.jwt.refreshToken);

    let userData = {id: res.id, isAdmin: res.isAdmin, employer: res.employer, name: res.name};
    localStorage.setItem('plug-user-data', JSON.stringify(userData));

    this.user.next(userData);
  }
}
