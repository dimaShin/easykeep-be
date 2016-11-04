import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'dashboard',
        pathMatch: 'full',
        loadChildren: () => new Promise(resolve => (require as any).ensure([], () => resolve(require('./routes/+dashboard/dashboard.module')['DashboardModule'])))
      },
      {
        path: 'auth',
        loadChildren: 'app/routes/+auth/auth.module#AuthModule',
        pathMatch: 'full'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
      }
    ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
