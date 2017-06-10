import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;

  constructor(private http: Http) { }

  register(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/users/register', user, { headers })
      .map(res => res.json());
  }

  authenticate(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/users/authenticate', user, { headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('/api/users/profile', { headers })
      .map(res => res.json());
  }

  storeToken(token) {
    localStorage.setItem('token', token);
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    localStorage.clear();
  }

  private loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

}
