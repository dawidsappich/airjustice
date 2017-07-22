import { AirportSearchResult } from './../models/AirportSearchResult';
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

  capture(record: any): Observable<any>{
    this.createAuthApiHeaders();
    console.log(record)
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

  private createAuthApiHeaders() {
    this.options = new RequestOptions({
      headers: new Headers({
        'content-type': 'application/json',
        'authorization': this.API_KEY
      })
    });
  }

}
