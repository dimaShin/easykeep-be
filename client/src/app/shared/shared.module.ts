import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {ApiService} from "./services/api.service";

@NgModule({
  declarations: [],
  imports: [HttpModule],
  providers: [ApiService]
})
export class SharedModule { }
