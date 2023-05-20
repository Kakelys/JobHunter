import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { SearchVacancyListComponent } from "./search/search-vacancy-list/search-vacancy-list.component";
import { SearchComponent } from "./search/search.component";
import { RouterModule } from "@angular/router";


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: SearchVacancyListComponent},
      {path: ':search', component: SearchVacancyListComponent},
    ])
  ],
  declarations: [
    SearchComponent,
    SearchVacancyListComponent,
  ],
  exports: [
    SearchComponent,
    SearchVacancyListComponent,
  ],
  providers: []
})
export class SearchVacancyModule {}
