import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToggleDarkModeComponent} from "../@shared/components/toggle-dark-mode/toggle-dark-mode.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-continuated-registration',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ToggleDarkModeComponent
    ],
  templateUrl: './continuated-registration.component.html',
  styleUrl: './continuated-registration.component.scss'
})
export class ContinuatedRegistrationComponent {
  forms: FormGroup;
  email_user: string;
  disabledButton: boolean = false;
  private uuid_registration: string;

  job_options = [
    {
      value: 'public',
      label: 'Servidor Público'
    },
    {
      value: 'self_employed',
      label: 'Empresário'
    },
    {
      value: 'clt_pj',
      label: 'Contrato CLT/PJ'
    },
    {
      value: 'unemployed',
      label: 'Desempregado'
    },
    {
      value: 'other',
      label: 'Outro'
    },

  ]

  constructor(
    private route: ActivatedRoute,
  ) {
    this.validateParams();
    this.buildForm();
  }

  validateParams() {
    this.route.params.subscribe(params => {
      if (params['uuid']) {
        this.uuid_registration = params['uuid'];
      }else{
        this.goToNotFound();
      }
    });
  }
  buildForm() {
    this.forms = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl(this.email_user),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    });
  }

  validatorFormField(field: string) {
    if(field === 'confirmPassword'){
      if(this.forms.get('password').value !== this.forms.get('confirmPassword').value){
        this.forms.get('confirmPassword').setErrors({notEqual: true});
      }
    }
    return this.forms.get(field).invalid && this.forms.get(field).touched;
  }

  sendConfirmationForms(){

  }

  goToNotFound() {
    window.location.href = '/not-found';
  }
}
