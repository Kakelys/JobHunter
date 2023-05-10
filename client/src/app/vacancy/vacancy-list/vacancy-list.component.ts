import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacancyService } from '../vacancy.service';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/company/company.model';
import { User } from 'src/shared/user.model';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent implements OnInit {

  constructor(
    private vacService: VacancyService,
    private toastr: ToastrService,
    private route: ActivatedRoute
    ) {}

  toTake = 30;
  page = 1;
  vacancies: any[] = [];
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
