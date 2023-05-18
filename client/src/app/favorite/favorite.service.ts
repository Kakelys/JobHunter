import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Favorite } from "./favorite.model";

@Injectable()
export class FavoriteService {

  constructor(
    private http: HttpClient
  ) {}

  add(vacancyId: number) {
    return this.http.post(env.apiUrl + 'v1/favorites?vacancy_id=' + vacancyId, {});
  }

  delete(favoriteId: number) {
    return  this.http.delete(env.apiUrl + 'v1/favorites/' + favoriteId);
  }

  deleteByVacancy(vacancyId: number) {
    console.log(vacancyId)
    return this.http.delete(env.apiUrl + 'v1/favorites?vacancy_id=' + vacancyId);
  }

  get(page: number, toTake: number) {
    return this.http.get<Favorite[]>(env.apiUrl + 'v1/favorites?page=' + page + '&to_take=' + toTake);
  }
}
