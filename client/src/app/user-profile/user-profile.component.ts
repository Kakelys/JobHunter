import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/shared/user.model';
import { Subscription } from 'rxjs';
import { UserDetail } from 'src/shared/user-detail.model';
import { UserProfileService } from './user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User;
  userSub: Subscription;

  isLoading = true;

  profile: UserDetail;

  constructor(
    private authService: AuthService,
    private profileService: UserProfileService,
    private toastr: ToastrService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.route.params.subscribe(params => {
      if(params.id != this.profile?.id) {
        this.updateProfile();
      }
    });
  }

  updateProfile() {
    this.profileService.getByIdDetail(this.route.snapshot.params?.id)
    .subscribe({
      next: profile => {
        console.log(profile, this.user);
        this.profile = profile;
        this.isLoading = false;
      },
      error: err => {
        this.toastr.error(err);
      }
    })
  }

  sendInvite() {
    this.profileService.invite(this.profile.id)
    .subscribe({
      next: () => {
        this.toastr.success('Invite sent');
      },
      error: err => {
        this.toastr.error(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
