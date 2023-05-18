import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  model: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid || this.isLoading)
      return;

    this.isLoading = true;
    this.model = {...form.value, password: undefined};

    this.authService.register(form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err);
        this.isLoading = false;
      },
    });
  }
}
