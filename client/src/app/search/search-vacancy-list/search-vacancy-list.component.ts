import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-vacancy-list',
  templateUrl: './search-vacancy-list.component.html',
  styleUrls: ['./search-vacancy-list.component.css']
})
export class SearchVacancyListComponent {

  @Input()
  searchText: string;
}
