import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { IconModule } from "src/app/icon.module";
import { AutoExpandDirective } from "./auto-expand.directive";
import { LoadingSpinnerComponent } from "src/app/loading-spinner/loading-spinner.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { VacancyElementComponent } from "src/app/vacancy/vacancy-element/vacancy-element.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
      FormsModule,
      CommonModule,
      IconModule,
      NgbModule,
      ToastrModule.forRoot({
        "closeButton": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "timeOut": 3000,
        "extendedTimeOut": 1000,
        "tapToDismiss": true,
        "autoDismiss": true,
        "maxOpened": 10,
        "preventDuplicates": true,
        "resetTimeoutOnDuplicate": true,

      }),
      LoadingSpinnerComponent,
      RouterModule,
    ],
    providers: [
    ],
    declarations: [
      AutoExpandDirective,
      VacancyElementComponent,
    ],
    exports: [
      CommonModule,
      FormsModule,
      ToastrModule,
      IconModule,
      AutoExpandDirective,
      LoadingSpinnerComponent,
      VacancyElementComponent,
      NgbModule,
      RouterModule
    ]
})
export class SharedModule {

}
