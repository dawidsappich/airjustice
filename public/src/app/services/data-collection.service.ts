import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class DataCollectionService {

  private domain: string = 'http://localhost:5000';
  private API_KEY = 'ZOEDU314YpfPSkw_dMXG0vr3AW-TjN1PF7XE-RXG'; // TODO: Create injectable ConfigService
  options: RequestOptions;

  constructor(private _http: Http) { }

  getAirportLookups() {
    this.createAuthApiHeaders();
    return this._http.post(`${this.domain}/dataService/airports`, {}, this.options).map(res => res.json());
  }

  getAirport(query: string): Observable<any>{
    if (!query || query == '') return;
    this.createAuthApiHeaders();
    return this._http.get(`${this.domain}/dataService/airport/${query.toUpperCase()}`, this.options).map(res => res.json());
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
