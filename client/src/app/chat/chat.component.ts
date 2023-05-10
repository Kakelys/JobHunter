import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from './chat.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Message } from './message.model';
import { User } from 'src/shared/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UserDetail } from 'src/shared/user-detail.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit{

  page = 1;
  messages: Message[] = [];

  sideUser: UserDetail;
  user: User;
  userSub: Subscription;

  @ViewChild('messagesBlock')
  messagesBlock;

  @ViewChildren('messagesFor')
  messagesFor;

  isLoading = true;

  constructor(
    private chatService: ChatService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileSerivice: UserProfileService) {}
  ngOnInit(): void {


    this.userSub = this.authService.user$.subscribe({
      next: user => {
        this.user = user;
      }
    })

    this.profileSerivice.getByIdDetail(this.route.snapshot.params['id'])
    .subscribe({
      next: user => {
        if(!user) {
          this.isLoading = false;
          return;
        }

        this.sideUser = user;
        this.isLoading = false;
        this.loadPage();
      },
      error: err => {
        this.toastr.error(err);
        this.isLoading = false;
      }
    })


  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.messagesFor.changes.subscribe(t=> {
      if(this.page-1 == 1)
        this.messagesBlock.nativeElement.scrollTop = this.messagesBlock.nativeElement.scrollHeight
    })
  }

  sendMessage(form: NgForm) {
    if(form.invalid)
      return;

    this.chatService.sendMessage(form.value.message, this.route.snapshot.params['id'])
      .subscribe({
        next: _ => {
          form.reset();
          this.toastr.success('Message sent!');
        },
        error: err => {
          this.toastr.error(err);
        }
      });
  }

  loadPage() {
    this.chatService.getMessages(this.route.snapshot.params['id'], this.page, 100)
      .subscribe({
        next: (messages: Message[]) => {
          console.log(messages);
          if(messages == null)
            return;

          this.messages.push(...messages);
          // if(this.page == 1)
            // setTimeout(() => this.messagesBlock.nativeElement.scrollTop = this.messagesBlock.nativeElement.scrollHeight, 1000);


          this.page++;
          //if(this.page-1 == 1)
            //this.loadPage();
        },
        error: err => {
          this.toastr.error(err);
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
