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

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
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
      LoadingSpinnerComponent
    ],
    providers: [
    ],
    declarations: [
      AutoExpandDirective
    ],
    exports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule,
      IconModule,
      AutoExpandDirective,
      LoadingSpinnerComponent,
      NgbModule,
    ]
})
export class SharedModule {

}
