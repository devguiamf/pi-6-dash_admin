import {Component, OnDestroy} from '@angular/core';
import {ToggleDarkModeComponent} from "../@shared/components/toggle-dark-mode/toggle-dark-mode.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Subject, takeUntil} from "rxjs";
import {CepResponsePipe, singupRequest, singupResponse} from "./singup.interface";
import {SingupService} from "./singup.service";
import {HttpClientModule} from "@angular/common/http";
import { LocalStorageService} from "../@shared/services/local-storage";

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    ToggleDarkModeComponent,
    ReactiveFormsModule,
    RouterLink,
    MatStepper,
    MatStep,
    MatFormField,
    MatLabel,
    MatStepperNext,
    MatStepLabel,
    MatStepperPrevious,
    HttpClientModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    SingupService,
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent implements OnDestroy{
  formAddress: FormGroup;
  formAccount: FormGroup;
  invitedId: string;
  inputPasswordType: string = 'password';
  spinnerCEP: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private singupService: SingupService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.verifyUUIDParams()
    this.buildForm();
    this.observeCEPChanges();
  }

  verifyUUIDParams(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if(params['uuid']){
          this.invitedId = params['uuid'];
        }
      });
  }

  buildForm() {
    this.buildFormAddress();
    this.buildFormAccount();
  }

  buildFormAccount() {
    this.formAccount = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  buildFormAddress() {
    this.formAddress = new FormGroup({
      cep: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      address: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
    })
  }

  observeCEPChanges(): void {
    this.formAddress.get('cep').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value.length === 8) {
          this.activateOrDeactivateSpinner();
          this.getAddressByCEP(value);
        }
    });
  }

  showPassword(): void {
    this.inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password';
  }

  getAddressByCEP(cep: string): void {
    this.singupService.getCEP(cep)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: CepResponsePipe) => {
        this.patchAddress(response);
      });
  }

  patchAddress(address: CepResponsePipe): void {
    this.formAddress.patchValue({
      address: address.address,
      state: address.state,
      city: address.city,
    });
    this.activateOrDeactivateSpinner();
  }

  validatorFormField(form: FormGroup, campo: string): boolean {
    return form.get(campo).touched && form.get(campo).invalid;
  }

  register(): void {
    const credentials = this.buildCredentials();
    this.singupService.singup(credentials, this.invitedId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: singupResponse) => {
        this.localStorage.set('user-info', response);
        this.router.navigate(['/home-page']);
      });
  };

  buildCredentials(): singupRequest {
    return {
      name: this.formAccount.get('name').value,
      cpf: this.formAccount.get('cpf').value,
      phone: this.formAccount.get('phone').value,
      email: this.formAccount.get('email').value,
      password: this.formAccount.get('password').value,
      address: {
        cep: this.formAddress.get('cep').value,
        address: this.formAddress.get('address').value,
        number: this.formAddress.get('number').value,
        state: this.formAddress.get('state').value,
        city: this.formAddress.get('city').value,
      }
    }
  }

  activateOrDeactivateSpinner(): void {
    this.spinnerCEP = !this.spinnerCEP;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
