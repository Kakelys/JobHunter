import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

  private userSub : Subscription;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('hehe')
    this.userSub = this.authService.autoAuth()?.subscribe();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  test() {
    this.http.get<string>('http://localhost:3000/test/auth')
      .subscribe({
        next: data => console.log(data),
        error: err => console.error(err)
      });
  }
}
