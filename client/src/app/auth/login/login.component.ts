import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  model: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.model = {...form.value, password: undefined};

    this.authService.login(form.value)
      .subscribe({
        next: _ => {
          this.toastr.success('Login successful!');
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: err => {
          this.toastr.error(err);
          this.isLoading = false;
        }
      });
  }

}
