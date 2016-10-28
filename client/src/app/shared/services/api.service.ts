import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService  {
  
  private tokenKey: string = 'auth-token';
  private _token: string = '';

  constructor(private _http: Http) { }

  get(url, options?: RequestOptionsArgs) {
    return this.intercept(this._http.get(url, this.extendOptions(options)));
  }

  post(url, data, options?: RequestOptionsArgs) {
    return this.intercept(this._http.post(url, data, this.extendOptions(options)));
  }

  extendOptions (options?: RequestOptionsArgs) {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.withCredentials = true;
    options.headers.append(this.tokenKey, this.token);
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.map((response: Response) => {
      this.token = response.headers.get(this.tokenKey);
      return response.json();
    });

  }

  get token() {
    return this._token || window.localStorage.getItem(this.tokenKey);
  }

  set token (token: string) {
    console.log('setting token: ', token);
    this._token = token;
    window.localStorage.setItem(this.tokenKey, token);
  }
}
