import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input()
  searchText: string = '';

  @Output()
  onSearch = new EventEmitter<string>();

  onSubmit() {
    this.onSearch.emit(this.searchText);
  }
}
