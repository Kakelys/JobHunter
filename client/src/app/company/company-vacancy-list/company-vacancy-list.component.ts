import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacancyService } from '../../vacancy/vacancy.service';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/company/company.model';
import { User } from 'src/shared/user.model';
import { Vacancy } from '../../vacancy/vacancy.model';

@Component({
  selector: 'app-company-vacancy-list',
  templateUrl: './company-vacancy-list.component.html',
  styleUrls: ['./company-vacancy-list.component.css']
})
export class CompanyVacancyList implements OnInit {

  constructor(
    private vacService: VacancyService,
    private toastr: ToastrService,
    private route: ActivatedRoute
    ) {}

  toTake = 30;
  page = 1;
  vacancies: Vacancy[] = [];
  isLoading = false;
  canLoadMore = true;

  @Input()
  company: Company;

  @Input()
  user: User;

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    if(!this.canLoadMore)
      return;

    this.isLoading = true;
    this.vacService.getByCompany(this.route.snapshot.params['id'], this.page, this.toTake).subscribe({
      next: data => {
        this.vacancies.push(...data);
        this.page++;
        this.isLoading = false;
        this.canLoadMore = !(this.company.vacancies === this.vacancies.length);
      },
      error: err => {
        this.toastr.error(err.error.message);
        this.isLoading = false;
      }
    });
  }



}
