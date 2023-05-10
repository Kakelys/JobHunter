import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VacancyService } from '../vacancy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vacancy-new',
  templateUrl: './vacancy-new.component.html',
  styleUrls: ['./vacancy-new.component.css']
})
export class VacancyNewComponent {

    isLoading = false;

    constructor(
      private vacancyService: VacancyService,
      private toastr: ToastrService) { }

    onSubmit(form: NgForm) {
      this.isLoading = true;

      this.vacancyService.create(form.value).subscribe({
        next: _ => {
          this.toastr.success("Vacancy created successfully");
          this.isLoading = false;
        },
        error: err => {
          this.toastr.error(err);
          this.isLoading = false;
        }
      })
    }
}
