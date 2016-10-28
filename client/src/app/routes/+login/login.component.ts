/**
 * Created by iashindmytro on 10/24/16.
 */
import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor (private api: ApiService, private _http: Http) {}

  ngInit() {

  }

  login() {
    this.api.post('http://127.0.0.1:3000/signin', {
      name: 'dima',
      password: '123456'
    }, { withCredentials: true })
      .subscribe(
        response => {
          console.log(response)
        },
        err => { console.log(err)}
      );
  }
}
