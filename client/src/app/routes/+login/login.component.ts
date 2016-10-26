/**
 * Created by iashindmytro on 10/24/16.
 */
import { Component } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor (private http: Http) {}
}
