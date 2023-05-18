import { VacancyDetailResponse } from '../vacancy/vacancy-detail-response.model';

export class FavoriteResponse {
    id: number;
    date: Date;
    vacancy: VacancyDetailResponse;
}