export interface LoginResponse {
  authToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
