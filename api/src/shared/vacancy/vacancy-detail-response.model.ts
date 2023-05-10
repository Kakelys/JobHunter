export class VacancyDetailResponse {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public salary: string,
        public postDate: Date,
        public isActive: boolean,
        public company: {
            id: number,
            name: string,
        },
        public author: {
            id: number,
            name: string,
        },
        public replies: number
    ) {}
}