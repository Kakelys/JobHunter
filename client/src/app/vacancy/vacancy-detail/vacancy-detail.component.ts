import { Component, OnDestroy, OnInit } from '@angular/core';
import { VacancyService } from '../vacancy.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/shared/user.model';
import { VacancyDetail } from '../vacancy-detail.model';
import { ReplyService } from 'src/shared/reply/reply.service';
import { FavoriteService } from 'src/app/favorite/favorite.service';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})
export class VacancyDetailComponent implements OnInit, OnDestroy {

  isLoading = false;
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
    private replyService: ReplyService,
    private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.loadVacancy();

    this.userSub = this.authServie.user$.subscribe({
      next: user => {
        this.user = user;
      }
    });
  }

  loadVacancy() {
    if(this.isLoading)
      return;

      this.isLoading = true;

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

  onFavorite() {
    if(this.addedToFavorite)
      this.deleteFromFavorite();
    else
      this.addToFavorite();
  }

  addToFavorite() {
    this.favoriteService.add(this.vacancy.id).subscribe({
      next: _ => {
        this.toastr.success('Added to favorite');
        this.addedToFavorite = true;
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  deleteFromFavorite() {
    this.favoriteService.deleteByVacancy(this.vacancy.id).subscribe({
      next: _ => {
        this.toastr.success('Removed from favorite');
        this.addedToFavorite = false;
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }
}
