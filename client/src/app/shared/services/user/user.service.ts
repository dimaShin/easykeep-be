

import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {User} from "./user.model";
@Injectable()
export class UserService {

  private _systemUSer: User;

  constructor(
    private api: ApiService
  ) { }

  create(data) {
    return new User(data);
  }

  get systemUser() {
    return this._systemUSer;
  }

  set systemUser(user) {
    this._systemUSer = user;
  }
}
