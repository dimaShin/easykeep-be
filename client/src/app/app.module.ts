import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "./shared/shared.module";
import {AuthService} from "./shared/services/auth.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: 'dashboard',
        pathMatch: 'full',
        loadChildren: () => new Promise(resolve => (require as any).ensure([], () => resolve(require('./routes/+dashboard/dashboard.module')['DashboardModule']))),
        canActivate: [AuthService]
      },
      {
        path: 'login',
        loadChildren: () => new Promise(resolve => (require as any).ensure([], () => resolve(require('./routes/+login/login.module')['LoginModule']))),
        pathMatch: 'full'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
