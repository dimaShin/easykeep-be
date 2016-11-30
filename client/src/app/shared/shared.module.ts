import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {ApiService} from "./services/api.service";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user/user.service";

@NgModule({
  declarations: [],
  imports: [HttpModule],
  providers: [
    ApiService,
    {provide: ApiService, useClass: ApiService},
    AuthService,
    UserService
  ]
})
export class SharedModule { }
