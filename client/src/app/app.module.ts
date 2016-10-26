import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'dashboard',
        pathMatch: 'full',
        loadChildren: () => new Promise(resolve => (require as any).ensure([], () => resolve(require('./routes/+dashboard/dashboard.module')['DashboardModule'])))
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
