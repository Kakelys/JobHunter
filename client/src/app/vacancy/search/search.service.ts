import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { VacancyDetail } from "../vacancy-detail.model";


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  getVacancies(page: number, toTake: number, searchText: string) {
    return this.http.get<VacancyDetail[]>(env.apiUrl + 'v1/vacancies?search=' + searchText + '&page=' + page + '&to_take=' + toTake);
  }

}
