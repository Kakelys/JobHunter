import { Injectable } from "@angular/core";
import { environment as env } from '../../environments/environment';
import { VacancyNew } from "src/app/vacancy/vacancy-new.model";
import { HttpClient } from "@angular/common/http";
import { Vacancy } from "./vacancy.model";
import { VacancyDetail } from "./vacancy-detail.model";

@Injectable()
export class VacancyService {

  private baseURL = env.apiUrl+'v1/vacancies/';

  constructor(private http: HttpClient) { }

  create(vacancy: VacancyNew) {
    return this.http.post(this.baseURL, vacancy);
  }

  getByCompany(companyId: number, page: number, toTake: number) {
    return this.http.get<Vacancy[]>(env.apiUrl + 'v1/companies/' + companyId + '/vacancies?page=' + page + '&to_take=' + toTake);
  }

  getDetail(vacancyId: number) {
    return this.http.get<VacancyDetail>(this.baseURL + vacancyId);
  }


}
