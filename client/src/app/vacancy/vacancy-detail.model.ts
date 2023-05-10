export class VacancyDetail {
  id: number;
  title: string;
  description: string;
  salary: string;
  postDate: Date;
  isActive: boolean;
  company: {
      id: number,
      name: string,
  };
  author: {
      id: number,
      name: string,
  };
  replies: number;
}
