import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
    ],
    providers: [],
    declarations: [
    ],
    exports: [
      CommonModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
    ]
})
export class SharedModule {

}
