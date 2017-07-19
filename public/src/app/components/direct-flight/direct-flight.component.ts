import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/deBounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/toPromise';


import 'rxjs/add/observable/of'

import { AirportSearchResult } from './../../models/AirportSearchResult';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCollectionService } from './../../services/data-collection.service';


@Component({
  selector: 'app-direct-flight',
  templateUrl: './direct-flight.component.html',
  styleUrls: ['./direct-flight.component.css']
})
export class DirectFlightComponent implements OnInit {

  form: FormGroup;
  resultsStart: Observable<any[]>;
  resultsEnd: Observable<any[]>;
  private searchTerms = new Subject<string>();
  value: any;

  constructor(private fb: FormBuilder, private dcs: DataCollectionService) { }

  // push new term into observable
  search(term: string) {
    this.searchTerms.next(term);
  }

  // {
  //     "success": true,
  //     "message": [
  //         {
  //             "_id": "596b841da929f141f3989dbc",
  //             "code": "AAH",
  //             "value": "Aachen"
  //         }
  //     ]
  // }

  ngOnInit() {
    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });

    this.resultsStart = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => term ? this.dcs.getAirport(term) : Observable.of<any>([]))
      .catch(err => {
        console.log(err);
        return Observable.of<any>([])
      });

  }

}
