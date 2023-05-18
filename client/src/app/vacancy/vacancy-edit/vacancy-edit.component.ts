import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VacancyService } from '../vacancy.service';
import { ToastrService } from 'ngx-toastr';
import { VacancyDetail } from '../vacancy-detail.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vacancy-edit',
  templateUrl: './vacancy-edit.component.html',
  styleUrls: ['./vacancy-edit.component.css']
})
export class VacancyEditComponent {

  @Input()
  vacancy: VacancyDetail;

  @Output()
  saved = new EventEmitter<void>();

  isLoading = false;

  constructor(
    private vacancyService: VacancyService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  save(form: NgForm) {
    if(this.isLoading)
      return;

    this.isLoading = true;

    this.vacancyService.update(this.vacancy.id, form.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.saved.emit();
      },
      error: err => {
        this.toastr.error(err);
      }
    })
  }

  delete() {
    if(this.isLoading)
      return;

    this.isLoading = true;

    this.vacancyService.delete(this.vacancy.id)
    .subscribe({
      next: _ => {
        this.toastr.success('Vacancy deleted!');
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error: err => {
        this.toastr.error(err);
        this.isLoading = false;
      }
    })
  }

}
