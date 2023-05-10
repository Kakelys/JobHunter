import { NgModule } from "@angular/core";
import { ChatComponent } from "./chat.component";
import { SharedModule } from "src/shared/shared.module";
import { RouterModule } from "@angular/router";
import { ChatService } from "./chat.service";
import { MessageComponent } from './message/message.component';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    ChatComponent,
    MessageComponent

  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'chat/:id', component: ChatComponent },
    ]),
  ],
  providers: [
    ChatService
  ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule {}
