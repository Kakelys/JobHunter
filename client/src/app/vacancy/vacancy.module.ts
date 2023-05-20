import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { VacancyNewComponent } from "./vacancy-new/vacancy-new.component";
import { VacancyEditComponent } from "./vacancy-edit/vacancy-edit.component";
import { VacancyReplyListComponent } from "./vacancy-reply-list/vacancy-reply-list.component";
import { VacancyDetailComponent } from "./vacancy-detail/vacancy-detail.component";
import { VacancyService } from "./vacancy.service";
import { RouterModule } from "@angular/router";
import { AuthHrGuard } from "../auth/auth-hr.guard";

@NgModule({
  imports:[
    SharedModule,
    RouterModule.forChild([
      {path: 'new', component: VacancyNewComponent, canActivate: [AuthHrGuard]},
      {path: ':id', component: VacancyDetailComponent},
    ])
  ],
  declarations: [
    VacancyNewComponent,
    VacancyEditComponent,
    VacancyReplyListComponent,
    VacancyDetailComponent,
  ],
  providers: [
    VacancyService
  ],
  exports: [
    VacancyNewComponent,
    VacancyEditComponent,
    VacancyReplyListComponent,
    VacancyDetailComponent,
  ],
})
export class VacancyModule{}
