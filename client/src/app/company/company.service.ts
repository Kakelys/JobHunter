import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "./company.model";
import { CompanyEdit } from "src/shared/company-edit.model";
import { environment as env } from "src/environments/environment";


@Injectable()
export class CompanyService {

  private baseURL = env.apiUrl + 'v1/companies/';

  constructor(private http: HttpClient) {}

  createCompany(name: string) {
    const companyData = {name: name};
    return this.http.post<any>(this.baseURL, companyData);
  }

  getCompany(companyId: number) {
    return this.http.get<Company>(this.baseURL + companyId);
  }

  updateCompany(companyId: number, data: CompanyEdit) {
    return this.http.put<any>(this.baseURL + companyId, data);
  }

  getEmployersCount(companyId: number) {
    return this.http.get<number>(this.baseURL + companyId + '/employers/count');
  }

}
