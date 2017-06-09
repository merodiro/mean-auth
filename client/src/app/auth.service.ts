import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  register(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/register', user, { headers })
      .map(res => res.json());
  }
  authenticate(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers })
      .map(res => res.json());
  }
  storeUser(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
