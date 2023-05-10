import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Reply } from "./reply.model";


@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http: HttpClient) {}

  reply(vacancyId: number) {
    return this.http.post(env.apiUrl + 'v1/replies?vacancy_id=' + vacancyId, {});
  }

  getByVacancy(vacancyId: number, page: number, toTake: number) {
    return this.http.get<Reply[]>(env.apiUrl + `v1/vacancies/${vacancyId}/replies?page=` + page + '&toTake=' + toTake);
  }

  updateStatus(replyId: number, status: string) {
    return this.http.put(env.apiUrl + `v1/replies/${replyId}`, {status: status});
  }
}
