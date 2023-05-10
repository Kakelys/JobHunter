import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { LoadingSpinnerComponent } from "src/app/loading-spinner/loading-spinner.component";
import { IconModule } from "src/app/icon.module";
import { AutoExpandDirective } from "./auto-expand.directive";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      IconModule,
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
    ],
    providers: [
    ],
    declarations: [
      AutoExpandDirective
    ],
    exports: [
      CommonModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule,
      IconModule,
      AutoExpandDirective
    ]
})
export class SharedModule {

}
