import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from '../company.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-company-new',
  templateUrl: './company-new.component.html',
  styleUrls: ['./company-new.component.css']
})
export class CompanyNewComponent {

  isLoading = false;

  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) {}

  onSubmit(form: NgForm) {
    this.isLoading = true
    this.companyService.createCompany(form.value.name)
      .subscribe({
        next: _ => {
          this.toastr.success('Company created successfully');
          this.router.navigate(['/']);
          this.authService.autoAuth()?.subscribe();
        },
        error: err => {
          this.toastr.error(err);
          this.isLoading = false;
        }
      });
  }
}
