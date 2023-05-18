import { NgModule } from '@angular/core';
import { ExtraOptions, Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes:Route[] = [
  {path: '', component: HomeComponent, pathMatch: 'full'}
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
