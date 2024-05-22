import {Component, OnDestroy} from '@angular/core';
import {UserLoggedInfoComponent} from "../components/user-logged-info/user-logged-info.component";
import {User, UserInvites} from "../user.interface";
import {UserService} from "../user.service";
import {HttpClientModule} from "@angular/common/http";
import {Subject, takeUntil} from "rxjs";
import {SpinnerComponent} from "../../@shared/components/spinner/spinner.component";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage";
import {UserListInvitesComponent} from "../components/user-list-invites/user-list-invites.component";
import {SnackBarNotificationService} from "../../@shared/services/snack-bar-notification.service";

@Component({
  selector: 'app-user.page',
  standalone: true,
  imports: [
    UserLoggedInfoComponent,
    HttpClientModule,
    SpinnerComponent,
    UserListInvitesComponent
  ],
  providers: [
    UserService
  ],
  templateUrl: './user.page.component.html',
  styleUrl: './user.page.component.scss'
})
export class UserPageComponent implements OnDestroy{
  destroy$: Subject<void> = new Subject<void>();

  user_looged_info!: User;
  user_logged_info_spinner_message: string = 'Carregando informações do usuário...';

  show_user_invites_list: boolean = false;
  user_invites_spinner_message: string = 'Carregando convites enviados...';


  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private snackBarService: SnackBarNotificationService
  ) {
    this.getUserLoggedInfoService();
    this.getUserInvitesListService();
  }

  getUserLoggedInfoService(){
    const user_list_sotrage = this.localStorage.get(StorageKeys.user_logged_info);

    if(user_list_sotrage){
      this.user_looged_info = user_list_sotrage;
      return;
    }

    this.userService.getUserLoggedInfoHttp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          setTimeout(() => {
            this.user_looged_info = user;
            this.localStorage.set(StorageKeys.user_logged_info, user);
          }, 3000)
        }
      });
  }

  getUserInvitesListService() {
    const user_invites_list = this.localStorage.get(StorageKeys.user_invites_list);

    if(user_invites_list){
      this.userService.attListInvites$(user_invites_list);
      this.show_user_invites_list = true;
      return;
    }

    this.userService.getUserInvitesListHttp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user_invites_list) => {
          setTimeout(() => {
            this.userService.attListInvites$(user_invites_list);
            this.show_user_invites_list = true;
          }, 3000)
        }
      });
  }

  sendInvite(user_invited: any){
   this.userService.sendInviteHttp(user_invited)
     .pipe(takeUntil(this.destroy$))
     .subscribe({
        next: (value) => {
          console.log(value)
          if(!Array.isArray(value)){
            this.snackBarService.openSuccessSnackBar('Convite enviado com sucesso!');
            this.getUserInvitesListService();
          }
        }
     })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly spinnerSize = spinnerSize;
}

enum spinnerSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}


