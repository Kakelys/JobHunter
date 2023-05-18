import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { VacancyNewComponent } from "./vacancy-new/vacancy-new.component";
import { VacancyEditComponent } from "./vacancy-edit/vacancy-edit.component";
import { VacancyReplyListComponent } from "./vacancy-reply-list/vacancy-reply-list.component";
import { VacancyDetailComponent } from "./vacancy-detail/vacancy-detail.component";
import { VacancyService } from "./vacancy.service";
import { RouterModule } from "@angular/router";
import { AuthHrGuard } from "../auth/auth-hr.guard";
import { SearchComponent } from "./search/search.component";
import { SearchVacancyListComponent } from "./search/search-vacancy-list/search-vacancy-list.component";
import { VacancyElementComponent } from './vacancy-element/vacancy-element.component';


@NgModule({
  imports:[
    SharedModule,
    RouterModule.forChild([
      {path: 'vacancy/new', component: VacancyNewComponent, canActivate: [AuthHrGuard]},
      {path: 'vacancy/:id', component: VacancyDetailComponent},
      {path: 'vacancies', component: SearchVacancyListComponent},
      {path: 'vacancies/:search', component: SearchVacancyListComponent},
    ])
  ],
  declarations: [
    VacancyNewComponent,
    VacancyEditComponent,
    VacancyReplyListComponent,
    VacancyDetailComponent,
    SearchComponent,
    SearchVacancyListComponent,
    VacancyElementComponent,
  ],
  providers: [
    VacancyService
  ],
  exports: [
    VacancyNewComponent,
    VacancyEditComponent,
    VacancyReplyListComponent,
    VacancyDetailComponent,
    SearchComponent,
    SearchVacancyListComponent,
    VacancyElementComponent,
  ],
})
export class VacancyModule{}
