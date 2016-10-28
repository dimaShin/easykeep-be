import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from "@angular/router";

interface TokenValidationResponse {
  isValid: boolean;
}

@Injectable()
export class AuthService implements CanActivate {

  constructor(private api: ApiService) { }

  login(data) {
    return this.api.post('/signin', data);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.verifyToken(this.api.token);
  }

  verifyToken(token: string) {
    return this.api.post('/token', { token })
      .toPromise().then((payload: TokenValidationResponse) => payload.isValid);
  }
}

