import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "./company.model";
import { CompanyEdit } from "src/shared/company-edit.model";
import { environment as env } from "src/environments/environment";
import { Employer } from "src/shared/employer.model";
import { Invite } from "src/shared/invite/invite.model";


@Injectable()
export class CompanyService {

  private baseURL = env.apiUrl + 'v1/companies/';

  constructor(private http: HttpClient) {}

  getCompany(companyId: number) {
    return this.http.get<Company>(this.baseURL + companyId);
  }

  getEmployers(companyId: number, page: number, toTake: number) {
    return this.http.get<Employer[]>(this.baseURL + companyId + '/employers?page=' + page + '&to_take=' + toTake);
  }

  getInvites(companyId: number, page: number, toTake: number) {
    return this.http.get<Invite[]>(this.baseURL + companyId + '/invites?page=' + page + '&to_take=' + toTake);
  }

  getEmployersCount(companyId: number) {
    return this.http.get<number>(this.baseURL + companyId + '/employers/count');
  }

  createCompany(name: string) {
    const companyData = {name: name};
    return this.http.post<any>(this.baseURL, companyData);
  }

  updateCompany(companyId: number, data: CompanyEdit) {
    return this.http.put<any>(this.baseURL + companyId, data);
  }

  leave(){
    return this.http.post(this.baseURL + 'leave', null)
  }

  kick(accountId: number) {
    return this.http.delete(env.apiUrl + 'v1/employers/'+accountId+'/kick/');
  }

  updateStatus(accountId: number, isHr: boolean) {
    return this.http.put(env.apiUrl + 'v1/employers/'+accountId+'/update-status/?is_hr='+isHr, {});
  }

  deleteInvite(inviteId: number) {
    return this.http.delete(env.apiUrl + 'v1/invites/'+ inviteId);
  }
}
