import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class DataCollectionService implements OnInit {

  private domain: string = 'http://localhost:5000';
  private API_KEY = 'ZOEDU314YpfPSkw_dMXG0vr3AW-TjN1PF7XE-RXG'; // TODO: Create injectable ConfigService
  options: RequestOptions;

  constructor(private _http: Http) { }

  ngOnInit() {
    this.createAuthApiHeaders();
  }

  getAirportLookups() {
    return this._http.post(`${this.domain}/dataService/airports`, {}, this.options).map(res => res.json());
  }

  getAirport(query: string): Observable<any>{
    return this._http.get(`${this.domain}/dataService/airport`, this.options).map(res => res.json());
  }

  private createAuthApiHeaders() {
    this.options = new RequestOptions({
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': this.API_KEY
      })
    });
  }

}
