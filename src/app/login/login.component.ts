import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToggleDarkModeComponent} from "../@shared/components/toggle-dark-mode/toggle-dark-mode.component";
import {LoginService} from "./login.service";
import {LoginResponse} from "./login.interface";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToggleDarkModeComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  typeInputPassword: string = 'password';
  forms: FormGroup;

  constructor(
    private router: Router,
    // private loginService: LoginService
  ) {
    this.forms = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  };

  validarCampoFormulario(campo: string): boolean {
    return this.forms.get(campo).touched && this.forms.get(campo).invalid;
  }

  changeInputpasswordType() {
    this.typeInputPassword = this.typeInputPassword === 'password' ? 'text' : 'password';
  };

  async sendCredentials() {
    const credentials = this.forms.value;
    // this.loginService.login(credentials).subscribe({
    //   next: async (response: LoginResponse) => {
    //     localStorage.setItem('token', response.token);
    //     await this.router.navigate(['/home-page'])
    //   },
    //   error: (error) => {
    //     if(error.status === 401){
    //       alert('Usuário ou senha inválidos')
    //     }
    //     if(error.status === 500) {
    //       alert('Erro no servidor')
    //     }
    //   }
    // });

  }

  async goToSingUp(){
     await this.router.navigate(['/singup'])
  }
}

