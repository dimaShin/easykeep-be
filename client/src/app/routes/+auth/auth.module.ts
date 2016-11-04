/**
 * Created by iashindmytro on 10/24/16.
 */
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthComponent} from './auth.component';
import {RouterModule, Routes} from "@angular/router";
import {routesConfig} from "./auth.routes";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '@angular/material';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routesConfig),
    CommonModule,
    MaterialModule.forRoot(),
  ],
  providers: []
})
export class AuthModule { }
