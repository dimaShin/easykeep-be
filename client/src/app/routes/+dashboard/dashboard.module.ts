/**
 * Created by iashindmytro on 10/24/16.
 */
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {routesConfig} from "./dashboard.routes";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(routesConfig)
  ],
  providers: []
})
export class DashboardModule {

  static routes:Routes = routesConfig;

}
