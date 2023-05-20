import { NgModule } from "@angular/core";
import { CompanyService } from "./company.service";
import { CompanyComponent } from "./company.component";
import { CompanyEditComponent } from "./company-edit/company-edit.component";
import { CompanyNewGuard } from "./company-new.guard";
import { CompanyElementComponent } from "./company-element/company-element.component";
import { CompanyNewComponent } from './company-new/company-new.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterModule } from "@angular/router";
import { CompanyMemberListComponent } from './company-member-list/company-member-list.component';
import { CompanyVacancyList } from "./company-vacancy-list/company-vacancy-list.component";
import { CompanyInviteListComponent } from './company-invite-list/company-invite-list.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: CompanyComponent, children: [
        {path: 'new', component: CompanyNewComponent, canActivate: [CompanyNewGuard]},
        {path: ':id', component: CompanyElementComponent}
      ]},
    ])
  ],
  declarations: [
    CompanyComponent,
    CompanyEditComponent,
    CompanyElementComponent,
    CompanyNewComponent,
    CompanyMemberListComponent,
    CompanyVacancyList,
    CompanyInviteListComponent,
  ],
  providers: [
    CompanyService,
    CompanyNewGuard
  ],
  exports: [
    CompanyComponent,
    CompanyEditComponent,
    CompanyElementComponent,
    CompanyNewComponent,
    CompanyVacancyList
  ],
})
export class CompanyModule {}
