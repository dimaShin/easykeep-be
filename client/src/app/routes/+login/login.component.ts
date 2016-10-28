/**
 * Created by iashindmytro on 10/24/16.
 */
import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {ApiService} from "../../shared/services/api.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor (private auth: AuthService) {}

  login() {
    this.auth.login({
      name: 'dima',
      password: '123456'
    }).subscribe(
        response => console.log(response),
        err => console.log(err)
      );
  }
}
