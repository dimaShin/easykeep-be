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
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent {
  constructor (
    private auth: AuthService,
    private userService: UserService
  ) {}

  login() {
    this.auth.login({
      email: 'dima@mail.com',
      password: '123456'
    }).subscribe(
        payload => {
          this.userService.systemUser = payload.user;
          console.log(this.userService.systemUser);
        }, err => console.log(err)
      );
  }
}
