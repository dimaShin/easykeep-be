/**
 * Created by iashindmytro on 10/24/16.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
import {RouterModule, Routes} from "@angular/router";
import {routesConfig} from "./login.routes";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(routesConfig),
    CommonModule
  ],
  providers: []
})
export class LoginModule {

  static routes:Routes = routesConfig;

}
