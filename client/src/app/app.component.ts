import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment as env } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService) {}

  test1() {

    this.http.get<string>('http://localhost:3000/test/auth')
      .subscribe({
        next: data => console.log(data),
        error: err => console.error(err)
      });
  }

  test2() {
    console.log(env.apiUrl)
  }

  testValidation() {
    this.http.post<string>('http://localhost:3000/test/validation', {})
      .subscribe({
        next: data => this.toastr.info(data),
        error: err => this.toastr.error(err)
      });
  }
}
