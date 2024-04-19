export interface LoginResponse {
  name: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
