import { Employer } from "./employer.model";
import { Jwt } from "./jwt.model";

export class AuthResponse {
  id: number;
  name: string;
  isAdmin: boolean;
  employer: Employer;
  jwt:Jwt;
}
