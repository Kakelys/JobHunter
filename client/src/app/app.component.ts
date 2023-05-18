import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment as env } from '../environments/environment';
import { WebsocketChatService } from './chat/websocket/websocket-chat.service';
import { Subscription } from 'rxjs';
import { WebsocketMessage } from './chat/websocket/websocket-message.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  userSub: Subscription;
  msgSub: Subscription

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private socketService: WebsocketChatService) {}

  ngOnInit(): void {
      this.userSub = this.authService.user$.subscribe(user => {
        if(!user) {
          this.socketService.disconnect();
          return;
        }

        //-1 plug, when user sending auth
        if(user.id && user.id != -1) {
          this.socketService.initClient(user.id,user.id)
          //notify if recieved new message
          this.socketService.msgSubject.subscribe(msg => {
            try {
              let msgObj:WebsocketMessage = JSON.parse(msg);

              //notify only user, that recieve new message
              if(user.id != msgObj.from.id)
                this.toastr.info('New message');
            } catch(err) {
              console.error(err)
            }
          })
        }

      })
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
      this.msgSub.unsubscribe();
  }

}
