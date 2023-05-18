import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { Message } from '../message.model';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { WebsocketMessage } from '../websocket/websocket-message.model';

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.css']
})
export class ChatWrapperComponent implements OnInit, OnDestroy {

  lastMessages: Message[] = [];
  page = 1;
  toTake = 30;
  isLoading = false;
  canLoadMore = true;

  user: User;
  userSub: Subscription;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.userSub = this.authService.user$.subscribe({
      next: user => {
        this.user = user;
      }
    })

    this.loadPage();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  updateChats() {
    this.page = 1;
    this.lastMessages = [];
    this.isLoading = false;
    this.canLoadMore = true;

    this.loadPage();
  }

  //TODO: Better check for id, because now it fully update? Or it because sort? idk
  tryUpdateChat(message: WebsocketMessage) {
    if(this.lastMessages.length == 0)
      return;

    let msg = this.lastMessages.find(m => m.from.id == message.from.id && m.to.id == message.toId);

    if(!msg) {
      this.updateChats();
      return;
    }

    msg.text = message.text;
    msg.date = message.date;

    this.lastMessages.sort((a, b) => {
      if(a.date > b.date)
        return -1;
      if(a.date < b.date)
        return 1;
      return 0;
    });
  }

  loadPage() {
    if(this.isLoading || !this.canLoadMore)
      return;

    this.isLoading = true;

    this.chatService.getChats(this.page, this.toTake)
    .subscribe({
      next: (data) => {
        this.isLoading = false;

        if(!data) {
          this.canLoadMore = false;
          return;
        }

        for(let i = 0; i < data.length; i++) {
          if(data[i].from.id == this.user?.id) {
            data[i].from = data[i].to;
          }
        }

        this.lastMessages.push(...data);
        this.page++;
      },
      error: err => {
        this.toastr.error(err)
        this.isLoading = false;
      }
    });
  }

}
