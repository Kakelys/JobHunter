
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from '../company.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent {

  @Input()
  company: Company;

  @Output()
  saved = new EventEmitter<void>();

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private toastr: ToastrService
    ) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;

    this.companyService.updateCompany(this.route.snapshot.params['id'], form.value)
      .subscribe({
        next: _ => {
          this.toastr.success('Company updated successfully');
          this.saved.emit();
          this.isLoading = false;
        },
        error: err => {
          this.toastr.error(err);
          this.isLoading = false;
        }
      })
  }
}
