/**
 * Created by iashindmytro on 10/24/16.
 */
import { Component } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {UserService} from "../../../shared/services/user/user.service";
import {slideLeftAnimation} from "../../../shared/animations/slide.left";

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
  animations: [slideLeftAnimation('signupState')]
})
export class SignupComponent {
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
