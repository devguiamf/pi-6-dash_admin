import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LoginRequest, LoginResponse} from "./login.interface"
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  API: string = "API...";

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/${this.API}/login`, credentials)
  }
}
