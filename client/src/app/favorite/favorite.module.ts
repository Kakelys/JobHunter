import { VacancyElementComponent } from './../vacancy/vacancy-element/vacancy-element.component';
import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { FavoriteService } from "./favorite.service";
import { FavoriteListComponent } from "./favorite-list/favorite-list.component";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { VacancyModule } from '../vacancy/vacancy.module';

@NgModule({
  declarations: [
    FavoriteListComponent
  ],
  imports: [
    SharedModule,
    VacancyModule,
    RouterModule.forChild([
      {path: 'favorite', component: FavoriteListComponent, canActivate: [AuthGuard]}
    ])
  ],
  providers: [
    FavoriteService
  ],
  exports: [
    FavoriteListComponent
  ],
})
export class FavoriteModule {}
