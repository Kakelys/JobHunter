import { NgModule } from "@angular/core";
import { UserProfileService } from "./user-profile.service";
import { SharedModule } from "src/shared/shared.module";
import { RouterModule } from "@angular/router";
import { UserProfileComponent } from "./user-profile.component";
import { UserProfileEditComponent } from "./user-profile-edit/user-profile-edit.component";
import { UserInviteListComponent } from "./user-invite-list/user-invite-list.component";
import { UserReplyListComponent } from './user-reply-list/user-reply-list.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: ':id', component: UserProfileComponent},
    ])
  ],
  declarations: [
    UserProfileComponent,
    UserProfileEditComponent,
    UserInviteListComponent,
    UserReplyListComponent
  ],
  providers: [
    UserProfileService
  ],
  exports: [
    UserProfileComponent,
    UserProfileEditComponent,
    UserInviteListComponent
  ]
})
export class UserProfileModule {}
