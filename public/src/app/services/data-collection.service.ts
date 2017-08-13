import { AirportSearchResult } from './../models/AirportSearchResult';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class DataCollectionService {

  private domain: string = 'http://localhost:5000';
  private API_KEY = 'ZOEDU314YpfPSkw_dMXG0vr3AW-TjN1PF7XE-RXG';
  options: RequestOptions;

  authToken: string;
  user: string;

  constructor(private _http: Http) { }

  capture(record: any): Observable<any> {
    this.createAuthApiHeaders();
    return this._http.post(`${this.domain}/records/record`, record, this.options).map(res => res.json());
  }

  getAirport(query: string): Observable<AirportSearchResult[]> {
    this.createAuthApiHeaders();
    return this._http.get(`${this.domain}/dataService/airport/${query.toUpperCase()}`, this.options).map(res => res.json().message);
  }

  getFormFieldDescription(field: string): Observable<any> {
    this.createAuthApiHeaders();
    return this._http.get(`${this.domain}/dataService/forms/${field}`, this.options).map(res => res.json().message);
  }

  registerUser(user: any) {
    this.createAuthApiHeaders();
    return this._http.post(`${this.domain}/auth/register`, user, this.options).map(res => res.json());
  }

  loginUser(user: any) {
    this.createAuthApiHeaders();
    return this._http.post(`${this.domain}/auth/login`, user, this.options).map(res => res.json());
  }

  // persist credentials on client side in local Storage
  storeUserdata(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  private createAuthApiHeaders() {
    this.options = new RequestOptions({
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': this.API_KEY
      })
    });
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

}
