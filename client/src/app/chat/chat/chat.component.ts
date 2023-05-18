import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../chat.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../message.model';
import { User } from 'src/shared/user.model';
import { Subscription, throwIfEmpty } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { UserDetail } from 'src/shared/user-detail.model';
import { WebsocketChatService } from '../websocket/websocket-chat.service';
import { WebsocketMessage } from '../websocket/websocket-message.model';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit{

  page = 1;
  toTake = 5;
  canLoadMore = true;
  isLoading = false;
  msgSending = false;

  //for scrolling at bottom if we already at bottom and recieved new message
  needToScroll = true;

  //for getting new messages from database considering that we may get new messages from webscoket
  difference = 0;

  //for staing at same scroll postion when loading new messages
  savedScrollPost = 0;
  isNewPage = false;

  messages: Message[] = [];

  sideUserId: number;

  @Output()
  messageForDiffChat = new EventEmitter<WebsocketMessage>();

  sideUser: UserDetail;
  user: User;
  userSub: Subscription;
  msgSub: Subscription;

  @ViewChild('messagesBlock')
  messagesBlock;

  @ViewChild('chat')
  chat;

  @ViewChildren('messagesFor')
  messagesFor;

  @ViewChild('messagesFor')
  messagesForBlock;

  constructor(
    private chatService: ChatService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileSerivice: UserProfileService,
    private socketService: WebsocketChatService,) {}

  ngOnInit(): void {
    //getting user info
    this.userSub = this.authService.user$.subscribe({
      next: user => {
        this.user = user;
      }
    })

    this.route.params.subscribe({
      next: params => {
        if(!params?.id) {
          //так-то костыль, который позволяет чату обновлятся, если не открыт ни один из чатов
          this.socketService.initClient(this.user.id, this.user.id);
          return;
        }


        this.socketService.disconnect();
        this.sideUserId = +params.id;

        this.messages = [];
        this.isLoading = true;
        this.canLoadMore = true;
        this.page = 1;
        this.difference = 0;
        this.needToScroll = true;

        //getting info about side user and loaing messages if use exist
        this.profileSerivice.getByIdDetail(params?.id)
        .subscribe({
          next: user => {
            this.isLoading = false;

            if(!user) {
              return;
            }

            this.sideUser = user;

            this.socketService.initClient(this.user.id, this.sideUser.id);
            this.loadPage();
          },
          error: err => {
            this.toastr.error(err);
            this.isLoading = false;
          }
        });


      }
    });

    //setup recieving message from webscoket
    this.msgSub = this.socketService.msgSubject.subscribe({
      next: (msg:string) => {
        try {
          let msgObj:WebsocketMessage = JSON.parse(msg);
          this.messageForDiffChat.emit(msgObj);

          if(!(msgObj.from.id == this.user.id && msgObj.toId == this.sideUserId) &&
             !(msgObj.from.id == this.sideUserId && msgObj.toId == this.user.id))
            return;

          if(this.messagesBlock?.nativeElement) {
            let msgBlock = this.messagesBlock.nativeElement

            let atBottom = (msgBlock.scrollHeight - msgBlock.scrollTop) == msgBlock.clientHeight;
            if(atBottom)
              this.needToScroll = true;
          }

          this.messages.push(msgObj);
          this.difference++;
        } catch(err) {
          console.error(err)
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  //updating scroll height
  ngAfterViewInit(): void {
    this.messagesFor.changes.subscribe(_ => {
      if(!this.messagesBlock?.nativeElement)
        return;

      if(this.needToScroll) {
        this.messagesBlock.nativeElement.scrollTop = this.messagesBlock.nativeElement.scrollHeight
        this.needToScroll = false;
      }

      if(this.isNewPage) {
        this.messagesBlock.nativeElement.scrollTop = this.savedScrollPost;
        this.isNewPage = false;
      }
    })
  }

  sendMessage(form: NgForm) {
    if(form.invalid)
      return;

    if(this.msgSending) {
      this.toastr.warning('Wait for the previous message to be sent')
      return;
    }

    this.msgSending = true;

    this.chatService.sendMessage(form.value.message, this.route.snapshot.params['id'])
      .subscribe({
        next: (msg:Message) => {
          this.socketService.sendMessage({
            id: msg.id,
            toId: this.sideUser.id,
            text: form.value.message,
            date: msg.date,
            from: {
              id: this.user.id,
              name: this.user.name
            }
          });

          form.reset();
          this.toastr.success('Message sent!');
          this.msgSending = false;
        },
        error: err => {
          this.toastr.error(err);
          this.msgSending = false;
        }
      });
  }

  loadPage() {
    if(this.isLoading || !this.canLoadMore)
      return;

    this.chatService.getMessages(this.route.snapshot.params['id'], this.page, this.toTake, this.difference)
      .subscribe({
        next: (messages: Message[]) => {
          this.isLoading = false;

          if(messages == null) {
            this.canLoadMore = false;
            return;
          }
          if(this.messages.length > 0) {
            this.savedScrollPost = this.messagesBlock.nativeElement.clientHeight;
            this.isNewPage = true;
          }


          for(let i = 0; i< messages.length; i++) {
            this.messages.unshift(messages[i])
          }

          this.page++;
        },
        error: err => {
          this.toastr.error(err);
          this.isLoading = false;
        }
      });
  }

  onMessageKeyDown(event: KeyboardEvent, form: NgForm) {
    if(event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage(form);
    }
  }
}
