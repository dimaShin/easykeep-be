/**
 * Created by iashindmytro on 10/24/16.
 */
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './login.component';
import {RouterModule, Routes} from "@angular/router";
import {routesConfig} from "./login.routes";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routesConfig),
    CommonModule,
    HttpModule
  ],
  providers: []
})
export class LoginModule {

  static routes:Routes = routesConfig;

}
