import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { CompanyNewComponent } from './company/company-new/company-new.component';
import { CompanyNewGuard } from './company/company-new.guard';
import { CompanyElementComponent } from './company/company-element/company-element.component';
import { HomeComponent } from './home/home.component';
import { VacancyNewComponent } from './vacancy/vacancy-new/vacancy-new.component';
import { VacancyNewGuard } from './vacancy/vacancy-new.guard';
import { VacancyElementComponent } from './vacancy/vacancy-element/vacancy-element.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './chat/chat.component';
import { SearchComponent } from './search/search.component';

const routes:Route[] = [
  {path: 'company', component: CompanyComponent, children: [
    {path: 'new', component: CompanyNewComponent, canActivate: [CompanyNewGuard]},
    {path: ':id', component: CompanyElementComponent}
  ]},
  {path: 'vacancy/new', component: VacancyNewComponent, canActivate: [VacancyNewGuard]},
  {path: 'vacancy/:id', component: VacancyElementComponent},
  {path: 'user/:id', component: UserProfileComponent},
  {path: 'vacancies', component: SearchComponent},
  {path: 'vacancies/:search', component: SearchComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
