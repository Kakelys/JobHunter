import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { UserDetail } from 'src/shared/user-detail.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent {

  @Input()
  profile: UserDetail;

  @Output()
  updated = new EventEmitter<void>();

  isLoading = false;

  constructor(
    private profileService: UserProfileService,
    private toastr: ToastrService) {}

  onSubmit(form: NgForm) {
    this.profileService.updateProfile(this.profile.id, form.value)
      .subscribe({
        next: _ => {
          this.toastr.success('Profile updated successfully');
          this.updated.emit();
        },
        error: err => {
          this.toastr.error(err);
        }
      });
  }
}
