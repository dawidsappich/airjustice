import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataCollectionService {

  private domain: string = 'http://localhost:8080';

  constructor(private _http: Http) { }

  getLookups(): Observable<any> {
    return this._http.get(`${this.domain}/lookups`).map(res => res.json);
  }

}
