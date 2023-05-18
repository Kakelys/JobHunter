import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { UserDetail } from "src/shared/user-detail.model";
import { ProfileEdit } from "./profile-edit.model";
import { Invite } from "src/shared/invite/invite.model";


@Injectable()
export class UserProfileService {

    constructor(private http: HttpClient) {}

    getByIdDetail(id: number) {
      return this.http.get<UserDetail>(env.apiUrl + 'v1/accounts/'+ id);
    }

    updateProfile(id: number, data: ProfileEdit) {
      return this.http.put(env.apiUrl + 'v1/accounts/'+ id, data);
    }

    getInvites(id: number, page: number, toTake: number) {
      console.log(page, toTake)
      return this.http.get<Invite[]>(env.apiUrl + 'v1/accounts/'+ id + '/invites?page='+ page +'&to_take='+ toTake);
    }

    getInviteCount(id: number) {
      return this.http.get<number>(env.apiUrl + 'v1/accounts/'+ id + '/invites/count');
    }

    invite(accountId: number) {
      return this.http.post(env.apiUrl + 'v1/invites', {accountId: accountId});
    }

    accept(inviteId: number) {
      return this.http.post(env.apiUrl + 'v1/invites/'+ inviteId +'/accept', {});
    }

    reject(inviteId: number) {
      return this.http.delete(env.apiUrl + 'v1/invites/'+ inviteId);
    }
}
