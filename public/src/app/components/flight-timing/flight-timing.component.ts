import { ChoiceTrackerService } from './../../services/choice-tracker.service';
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

  constructor(private container: ViewContainerRef, private userChoices: ChoiceTrackerService) { }

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
      let records = [];

      this.isChecked = false; // to disable button
      this.searchfields.forEach(/*SearchFlightComponent*/(item, idx) => {
        
        let airport = item.form.controls['airport'].value;
        let date = item.form.get('date').value;
        let hour = item.form.get('hour').value;
        let hourReal = item.form.get('hourReal').value;
        let record = { idx, airport, date, hour, hourReal };
        records.push(record)

        item.processing = true;
        item.disableForm();
      });

      this.userChoices.addChcoice(FormStep.TIMING, records);
      this.response.emit(new FormResponse(FormStep.TIMING, records)); // tell parent component that form ist ok
    }
  }

}
