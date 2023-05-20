import { NgModule } from "@angular/core";
import { ChatComponent } from "./chat/chat.component";
import { SharedModule } from "src/shared/shared.module";
import { RouterModule } from "@angular/router";
import { ChatService } from "./chat.service";
import { MessageComponent } from './message/message.component';
import { AuthGuard } from "../auth/auth.guard";
import { WebsocketChatService } from "./websocket/websocket-chat.service";
import { ChatWrapperComponent } from "./chat-wrapper/chat-wrapper.component";


@NgModule({
  declarations: [
    ChatComponent,
    MessageComponent,
    ChatWrapperComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ChatWrapperComponent, canActivate: [AuthGuard]},
      { path: ':id', component: ChatWrapperComponent, canActivate: [AuthGuard]},
    ]),
  ],
  providers: [
    ChatService,
    WebsocketChatService
  ],
  exports: [
    ChatComponent,
    ChatWrapperComponent,
    MessageComponent
  ]
})
export class ChatModule {}
