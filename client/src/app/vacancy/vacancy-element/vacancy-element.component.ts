import { Component, OnDestroy, OnInit } from '@angular/core';
import { VacancyService } from '../vacancy.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/shared/user.model';
import { VacancyDetail } from '../vacancy-detail.model';
import { ReplyService } from 'src/shared/reply/reply.service';

@Component({
  selector: 'app-vacancy-element',
  templateUrl: './vacancy-element.component.html',
  styleUrls: ['./vacancy-element.component.css']
})
export class VacancyElementComponent implements OnInit, OnDestroy {

  isLoading = true;
  isReplyLoading = false;
  vacancy: VacancyDetail;
  user: User;
  private userSub: Subscription;

  addedToFavorite = false;

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute,
    private authServie: AuthService,
    private toastr: ToastrService,
    private replyService: ReplyService) { }

  ngOnInit() {
    this.vacancyService.getDetail(this.route.snapshot.params['id'])
    .subscribe({
      next: (vacancy: VacancyDetail) => {
        this.isLoading = false;
        this.vacancy = vacancy;
      },
      error: err => {
        this.toastr.error(err);
      }
    });

    this.userSub = this.authServie.user$.subscribe({
      next: user => {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  sendReply() {
    console.log('hehe');
    this.isReplyLoading = true;
    this.replyService.reply(this.vacancy.id).subscribe({
      next: _ => {
        this.toastr.success('You have successfully replied to this vacancy.');
        this.isReplyLoading = false;
      },
      error: err => {
        this.toastr.error(err);
        this.isReplyLoading = false;
      }
    })
  }

  addToFavorite() {
    this.addedToFavorite = true;
  }
}
