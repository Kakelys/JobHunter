import { Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reply } from 'src/shared/reply/reply.model';
import { ReplyService } from 'src/shared/reply/reply.service';
import { UserDetail } from 'src/shared/user-detail.model';

@Component({
  selector: 'app-user-reply-list',
  templateUrl: './user-reply-list.component.html',
  styleUrls: ['./user-reply-list.component.css']
})
export class UserReplyListComponent implements OnInit {

  isLoading = false;
  canLoadMore = true;

  page = 1;
  toTake = 30;

  replies: Reply[] = [];

  @Input()
  profile: UserDetail;

  constructor(
    private replyService: ReplyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.loadPage();
  }

  loadPage() {
    if(this.isLoading || !this.canLoadMore)
      return;

    this.isLoading = true;
    this.replyService.get(this.page, this.toTake)
    .subscribe({
      next: reps => {
        this.isLoading = false;
        if(!reps) {
          this.canLoadMore = false;
          return;
        }

        this.replies.push(...reps);
        this.page++;
      },
      error: err => {
        this.toastr.error(err);
      }
    })
  }

}
