import { Component } from '@angular/core';
import {ToggleDarkModeComponent} from "../@shared/components/toggle-dark-mode/toggle-dark-mode.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    ToggleDarkModeComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {
  forms: FormGroup;
  messageEmailControl: boolean = false;
  spinner: boolean = false;
  disabledButton: boolean = false;

  constructor() {
    this.forms = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  validatorFormField(campo: string): boolean {
    return this.forms.get(campo).touched && this.forms.get(campo).invalid;
  }

  sendEmailVerification() {
    // console.log(this.formulario.value);
    this.messageEmailControl = true;
    this.spinner = true;
    this.disabledButton = true;
  }

}
