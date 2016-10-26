import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response, ConnectionBackend, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class ApiService extends Http {

  private _token: string = '';

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  get(url, options?: RequestOptionsArgs) {
    return this.intercept(super.get(url, this.extendOptions(options)));
  }

  extendOptions (options?: RequestOptionsArgs) {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
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
