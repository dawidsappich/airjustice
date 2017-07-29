import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/deBounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'

import { AirportSearchResult } from './../../models/AirportSearchResult';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCollectionService } from './../../services/data-collection.service';


@Component({
  selector: 'search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  processing = false;
  form: FormGroup;
  results: Observable<any[]>;
  private searchTerms: Subject<string>;
  @Output() selected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private dcs: DataCollectionService) { }

  // push new term into observable
  search(term: string) {
    if (term && term.length > 1) {
      this.searchTerms.next(term);
    }
    if (term == '') {
      this.searchTerms.next('');
    }
  }

  ngOnInit() {
    this.searchTerms = new Subject<string>();
    this.form = this.fb.group({
      airport: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.results = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.dcs.getAirport(term) : Observable.of<any>([]))
      .catch(err => {
        console.log(err);
        return Observable.of<any>([])
      });
  }

  onChange() {
    this.selected.emit(true);
  }

  addValue(value) {
    this.form.get('airport').setValue(value);
    this.searchTerms.next(''); // reset list by emitting an empty string for the Observable
    this.selected.emit(true); // signal parent component that something is seleceted
  }

  disableForm() {
    this.form.get('airport').disable();
    this.form.get('time').disable();
    this.form.disable();
  }

  ensableForm() {
    this.form.enable();
    this.form.get('airport').enable();
    this.form.get('time').enable();
  }

}
