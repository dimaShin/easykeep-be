import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from "@angular/router";
import {User} from "./user/user.model";
import {UserService} from "./user/user.service";

export interface TokenValidationPayload {
  isValid: boolean;
}

export interface LoginPayload {
  toke: string;
  user: User;
}

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  login(data) {
    return this.api.post('/signin', data)
      .map((payload: LoginPayload) => {
        return Object.assign(payload, {
          user: this.userService.create(payload.user)
        });
      })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.verifyToken(this.api.token)
      .then(isValid => {
        if (isValid) {
          return true;
        }
        this.router.navigate(['/auth']);
        return false;
      });
  }

  verifyToken(token: string) {
    return this.api.post('/token', { token })
      .toPromise().then((payload: TokenValidationPayload) => payload.isValid);
  }
}

