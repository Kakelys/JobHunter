import { Employer } from "./employer.model";

export class User {
  id: number;
  name: string;
  isAdmin: boolean;
  employer: Employer;
}
