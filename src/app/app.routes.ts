import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SingupComponent} from "./singup/singup.component";
import {NotFoundComponent} from "./@shared/pages/not-found/not-found.component";
import {
  ContinuatedRegistrationComponent
} from "./continuated-registration/continuated-registration.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    title: "LOGIN",
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    path: 'login'
  },
  {
    title: "SINGUP",
    loadComponent: () => import('./singup/singup.component').then(m => m.SingupComponent),
    path: 'singup'
  },
  {
    path: "continuated-registration/:uuid",
    loadComponent: () => import('./continuated-registration/continuated-registration.component').then(m => m.ContinuatedRegistrationComponent),
    pathMatch: "full"
  },
  {
    path: "home-page",
    loadChildren: () => import('./home-page/home.module').then(m => m.HomeModule),
    title: "HOME PAGE",
  },
  {
    path: "**",
    pathMatch: "full",
    loadComponent: () => import('./@shared/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },

];
