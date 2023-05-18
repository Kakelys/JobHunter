import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { VacancyDetail } from 'src/app/vacancy/vacancy-detail.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-vacancy-list',
  templateUrl: './search-vacancy-list.component.html',
  styleUrls: ['./search-vacancy-list.component.css']
})
export class SearchVacancyListComponent implements OnInit, OnDestroy {

  @Input()
  searchText: string = '';
  isLoading = false;
  canLoadMore = true;

  searchSub: Subscription;
  vacancies: VacancyDetail[] = [];

  page = 1;
  toTake = 30;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchSub = this.route.params.subscribe(params => {
      this.page = 1;
      this.vacancies = [];
      this.searchText = params.search ?? '';
      this.canLoadMore = true;
      this.loadPage();
    });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  loadPage() {
    if(!this.canLoadMore)
      return;

    this.isLoading = true;
    this.searchService.getVacancies(this.page, this.toTake, this.searchText)
    .subscribe({
      next: data => {
        this.isLoading = false;

        if(!data) {
          this.canLoadMore = false;
          return;
        }

        this.page++;
        this.vacancies.push(...data);

      },
      error: err => {
        this.toastr.error(err);
        this.isLoading = false;
      }
    });
  }

  onNewSearch(searchText: string) {
    this.router.navigate(['/vacancies', searchText]);
  }
}
