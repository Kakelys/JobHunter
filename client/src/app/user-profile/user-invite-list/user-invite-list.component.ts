import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { UserDetail } from 'src/shared/user-detail.model';
import { ToastrService } from 'ngx-toastr';
import { Invite } from 'src/shared/invite/invite.model';
import { thermometerSnow } from 'ngx-bootstrap-icons';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-invite-list',
  templateUrl: './user-invite-list.component.html',
  styleUrls: ['./user-invite-list.component.css']
})
export class UserInviteListComponent implements OnInit {

  isLoading = true;
  canLoadMore = false;
  invites: Invite[] = [];

  private page = 1;
  private toTake = 30;
  private inviteCount = 0;

  @Input()
  profile: UserDetail;

  @Output()
  updated = new EventEmitter<void>();

  constructor(
    private profileService: UserProfileService,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if(!this.profile) {
      this.toastr.error('Failed to load profile info');
      return;
    }

    this.profileService.getInviteCount(this.profile.id).subscribe({
      next: count => {
        this.inviteCount = count;
        this.canLoadMore = this.inviteCount > this.invites.length;
        this.loadPage();
      },
      error: err =>{
        this.toastr.error(err);
      }
    })
  }

  loadPage() {
    if(!this.canLoadMore) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.profileService.getInvites(this.profile.id, this.page, this.toTake)
    .subscribe({
      next: invites => {
        this.invites.push(...invites);
        this.isLoading = false;
        this.canLoadMore = this.inviteCount > this.invites.length;
        this.page++;
      },
      error: err => {
        this.toastr.error(err);
        this.isLoading = false;
      }
    });
  }

  accept(inviteId: number) {
    this.profileService.accept(inviteId).subscribe({
      next: () => {
        this.toastr.success('Invite accepted');
        this.authService.autoAuth()?.subscribe();
        this.invites = this.invites.filter(i => i.id != inviteId);
        this.updated.emit();
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  reject(inviteId: number) {
    this.profileService.reject(inviteId).subscribe({
      next: () => {
        this.toastr.success('Invite rejected');
        this.invites = this.invites.filter(i => i.id != inviteId);
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

}
