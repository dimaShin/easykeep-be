import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";


@Injectable()
export class ApiService  {
  
  private tokenKey: string = 'auth-token';
  private _token: string = '';
  private baseUrl: string = 'http://127.0.0.1:3000';

  constructor(
    private _http: Http,
    private router: Router
  ) { }

  get(url: string, query, options?: RequestOptionsArgs) {
    return this.intercept(this._http.get(this.baseUrl + url + JSON.stringify(query), this.extendOptions(options)));
  }

  post(url, data, options?: RequestOptionsArgs) {
    return this.intercept(this._http.post(this.baseUrl + url, data, this.extendOptions(options)));
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

  intercept(observable: Observable<Response>): Observable<any> {
    return observable.map((response: Response) => {
      if (response.status === 401) {
        this.router.navigateByUrl('/login');
      }

      let token: string = response.headers.get(this.tokenKey);

      if (token) {
        this.token = token;
      }

      return response.json();
    });

  }

  get token() {
    return this._token || window.localStorage.getItem(this.tokenKey);
  }

  set token (token: string) {
    this._token = token;
    window.localStorage.setItem(this.tokenKey, token);
  }
}
