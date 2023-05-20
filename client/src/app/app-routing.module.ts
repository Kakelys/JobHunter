import { NgModule } from '@angular/core';
import { ExtraOptions, Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes:Route[] = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'user', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)},
  {path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)},
  {path: 'vacancies', loadChildren: () => import('./vacancy/search-vacancy.module').then(m => m.SearchVacancyModule)},
  {path: 'vacancy', loadChildren: () => import('./vacancy/vacancy.module').then(m => m.VacancyModule)},
  {path: 'favorite', loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule)},
  {path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
