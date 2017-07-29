import { SearchFlightComponent } from './../search-flight/search-flight.component';
import { FormResponse } from './../../models/form-response.model';
import { FormStep } from './../../models/form-step.model';
import { IFormResponse } from './../../models/form-response.interface';
import { Component, OnInit, EventEmitter, Output, ViewChildren, QueryList, OnDestroy, ContentChildren, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'flight-timing',
  templateUrl: './flight-timing.component.html',
  styleUrls: ['./flight-timing.component.css']
})
export class FlightTimingComponent implements OnInit, IFormResponse {

  isChecked = false;

  @Output() response: EventEmitter<FormResponse> = new EventEmitter<FormResponse>();

  @ViewChildren(SearchFlightComponent) searchfields: QueryList<SearchFlightComponent>;

  constructor(private container:ViewContainerRef) { }

  ngOnInit() {
  }

  doCheck() {
    // check all forms an accumulate valid value into isChecked
    this.isChecked = this.searchfields.map(item => item.form.valid).reduce((prevValue, currentValue) => {
      return prevValue && currentValue;
    });
    if (this.isChecked) {
      //
    }
  }

  process() {
    if (this.isChecked) {
      this.isChecked = false; // to disable button
      this.searchfields.forEach(item => {
        item.processing = true;
        item.disableForm();
      }); // disable searchfields
      // this.response.emit(new FormResponse(FormStep.TIMING)); // tell parent component that form ist ok
    }
  }

}
