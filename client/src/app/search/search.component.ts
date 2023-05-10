import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { VacancyDetail } from '../vacancy/vacancy-detail.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchText: string;
  searchSub: Subscription;
  vacancies: VacancyDetail[] = [];

  page = 1;
  toTake = 30;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private toastr: ToastrService
  ) { }



  ngOnInit(): void {
    this.searchSub = this.route.params.subscribe(params => {
      this.searchText = params['search'];
    });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  loadPage() {}

}
