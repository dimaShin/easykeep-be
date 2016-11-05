/**
 * Created by iashindmytro on 10/24/16.
 */
import {Component, OnInit} from '@angular/core';
import {AuthService, LoginPayload} from "../../../shared/services/auth.service";
import {UserService} from "../../../shared/services/user/user.service";
import {slideLeftAnimation} from "../../../shared/animations/slide.left";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {slideYAnimation} from "../../../shared/animations/slideY";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  animations: [
    slideLeftAnimation('loginState'),
    slideYAnimation('errorState', '-10px'),
    slideYAnimation('authError', '10px')
  ]

})
export class LoginComponent implements OnInit {

  email: FormControl;
  password: FormControl;
  form: FormGroup;
  showAuthError: boolean = false;

  constructor (
    private auth: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.email = this.formBuilder.control(
      '',
      [
        Validators.required,
        Validators.pattern('^\\w{1,}@\\w{1,}\\.[a-zA-Z]{2,4}')
      ]
    );
    this.password = this.formBuilder.control(
      '',
      [Validators.required, Validators.minLength(6)]
    );
    this.form = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  login() {
    this.showAuthError = false;
    this.auth.login({
      email: (this.form.controls as any).email.value,
      password: (this.form.controls as any).password.value
    })
      .subscribe(
        payload => this.onSuccess(payload),
        err => this.onError(err)
      );
  }

  onError(err: any) : void {
    this.showAuthError = true;
    console.error(err);
  }

  onSuccess(payload: LoginPayload) : void {
    this.userService.systemUser = payload.user;
    this.router.navigate(['/dashboard'])
  }
}
