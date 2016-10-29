/**
 * Created by iashindmytro on 10/24/16.
 */
import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {ApiService} from "../../shared/services/api.service";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor (
    private auth: AuthService,
    private userService: UserService
  ) {}

  login() {
    this.auth.login({
      name: 'dima',
      password: '123456'
    }).subscribe(
        payload => {
          this.userService.systemUser = payload.user;
          console.log(this.userService.systemUser);
        }, err => console.log(err)
      );
  }
}
