import { Jwt } from "./jwt.model";

export class AuthResponse {
  id: number;
  is_admin: boolean;
  jwt:Jwt;
}
