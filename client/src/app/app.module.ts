import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
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
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'dashboard',
        pathMatch: 'prefix',
        loadChildren: 'app/routes/+dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthService]
      },
      {
        path: 'auth',
        loadChildren: 'app/routes/+auth/auth.module#AuthModule',
        pathMatch: 'prefix'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
