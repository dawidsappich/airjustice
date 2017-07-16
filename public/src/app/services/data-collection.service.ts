import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataCollectionService {

  private domain: string = 'http://localhost:5000';
  private API_KEY = 'ZOEDU314YpfPSkw_dMXG0vr3AW-TjN1PF7XE-RXG';
  options: RequestOptions;

  constructor(private _http: Http) { }

  getLookups(): Observable<any> {
    this.createAuthApiHeaders();
    return this._http.post(`${this.domain}/dataService/airports`, this.options).map(res => res.json());
  }

  createAuthApiHeaders() {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'apikey': this.API_KEY
      })
    });
  }

}
