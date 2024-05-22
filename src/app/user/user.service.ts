import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {User, UserInvites, UserInvitesResponse, UserSearchOptions} from "./user.interface";
import {api} from "../api";
import {SnackBarNotificationService} from "../@shared/services/snack-bar-notification.service";
import {Search} from "../@shared/util/search";
import {LocalStorageService} from "../@shared/services/local-storage";
import {UserInvited} from "./components/user-list-invites/user-list-invites.component";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user_list_invites$: BehaviorSubject<UserInvites[]> = new BehaviorSubject<UserInvites[]>([]);
  headers: HttpHeaders
  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarNotificationService,
    private localStorageService: LocalStorageService
  ) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorageService.get('token')}`
    })
  }

  getUserLoggedInfoHttp(): Observable<User>{
    return of({
      name: 'Guilherme de Almeida',
      email: 'Guilherme.amf18@gmail.com',
      maritalStatus: 'Solteiro',
      role: 'Admin',
      isConfirmed: true,
      address: {
        cep: '14401386',
        address: 'Rua Maranhão',
        number: '2255',
        state: 'SP',
        city: 'Franca'
      }
    });
    // return this.http.get<UserData>(`${api}/admin/user`)
    //   .pipe(
    //     catchError(err => {
    //       this.snackBarService.openErrorSnackBar("Ops, algo deu errado!")
    //       return of([]);
    //     })
    //   );
  }

  getUserInvitesListHttp(paginationOptions?: UserSearchOptions): Observable<UserInvites[]>{
    const user = [{
      id: '1',
      token: '123123123',
      email: 'Teste@gmail.com',
      name: 'Teste',
      status: 'Pendente',
      createdAt: new Date(),
      expiresAt: new Date()
    }]
    return of(user)
    // const querySearch = paginationOptions ? Search.toQuerySearchOptions(paginationOptions) : Search.InitialSearchOptions();
    // return this.http.get<UserInvitesResponse>(`${api}/admin/sign-up/invites${querySearch}`)
    //   .pipe(
    //     map((response: UserInvitesResponse) => response.items),
    //     catchError(err => {
    //       this.snackBarService.openErrorSnackBar("Ops, algo deu errado!")
    //       return of([]);
    //     })
    //   );
  }

  sendInviteHttp(credentials: UserInvited): Observable<any>{
    return this.http.post(`${api}/admin/sign-up/invites`, credentials, {
      headers: this.headers
    })
      .pipe(
        catchError(err => {
          this.snackBarService.openErrorSnackBar("Ops, algo deu errado: " + err.error.message)
          return of([])
        })
      )
  }

  attListInvites$(list: UserInvites[]){
    this.user_list_invites$.next(list);
    this.localStorageService.set('user_invites_list', list);
  }

  addToList$(list: UserInvites){
    const currentList = this.user_list_invites$.value;
    this.user_list_invites$.next([list, ...currentList]);
    this.localStorageService.set('user_invites_list', [list, ...currentList]);
  }


}
