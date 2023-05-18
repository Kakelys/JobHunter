import { Component, Input, OnInit } from '@angular/core';
import { VacancyDetail } from '../vacancy-detail.model';
import { Reply } from 'src/shared/reply/reply.model';
import { ReplyService } from 'src/shared/reply/reply.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vacancy-reply-list',
  templateUrl: './vacancy-reply-list.component.html',
  styleUrls: ['./vacancy-reply-list.component.css']
})
export class VacancyReplyListComponent implements OnInit {

  @Input()
  vacancy: VacancyDetail;

  isLoading = false;
  page = 1;
  toTake = 30;
  canLoadMore = false;

  replies: Reply[] = [];

  constructor(
    private replyService: ReplyService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.canLoadMore = this.vacancy.replies > 0;

    this.loadPage();
  }

  loadPage() {
    if(!this.canLoadMore)
      return;

    this.isLoading = true;
    this.replyService.getByVacancy(this.vacancy.id, this.page, this.toTake)
    .subscribe({
      next: (replies: Reply[]) => {
        this.isLoading = false;

        if(!replies){
          this.canLoadMore = false;
          return;
        }

        this.replies.push(...replies);
        this.canLoadMore = replies.length < this.vacancy.replies;
        this.page++;
      },
      error: err => {
        this.toastr.error(err);
        this.isLoading = false;
      }
    });
  }

  onSave(form: NgForm, replyId: number) {
    this.replyService.updateStatus(replyId, form.value.status)
    .subscribe({
      next: _ => {
        this.toastr.success('Saved');
      },
      error: err => {
        this.toastr.error(err);
      }
    })
  }

}
