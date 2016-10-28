import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService  {

  private _token: string = '';

  constructor(private _http: Http) { }

  get(url, options?: RequestOptionsArgs) {
    return this.intercept(this._http.get(url, this.extendOptions(options)));
  }

  post(url, options?: RequestOptionsArgs) {
    return this.intercept(this._http.post(url, this.extendOptions(options)));
  }

  extendOptions (options?: RequestOptionsArgs) {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.withCredentials = true;
    options.headers.append('auth-token', this.token);
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.map((response: Response) => {
      let payload = response.json();
      let headers = payload.headers;

      this.token = headers.get('auth-token');

      return payload;
    });

  }

  get token() {
    return this._token || window.localStorage.getItem('auth-token');
  }

  set token (token: string) {
    this._token = token;
    window.localStorage.setItem('auth-token', token);
  }
}
