import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {ApiService} from "./services/api.service";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [],
  imports: [HttpModule],
  providers: [ApiService, AuthService]
})
export class SharedModule { }
