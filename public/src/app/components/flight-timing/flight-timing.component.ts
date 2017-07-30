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
  delay = '';
  delayTime: number;
  records = [];

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
    this.records = [];
    this.populateValues();
    if (this.isChecked) {
      this.calculateDeltaTime(this.records);
    }
  }

  process() {
    if (this.isChecked) {
      this.records = []; // reset records

      this.isChecked = false; // to disable button
      this.searchfields.forEach(/*SearchFlightComponent*/(item, idx) => {

        let airport = item.form.controls['airport'].value;
        let date = item.form.get('date').value;
        let hour = item.form.get('hour').value;
        let hourReal = item.form.get('hourReal').value;
        let record = { idx, airport, date, hour, hourReal };
        this.records.push(record);

        item.processing = true;
        item.disableForm();
      });
      this.calculateDeltaTime(this.records);
      this.records.push({ flightDelayedAmount: this.delayTime });
      this.userChoices.addChcoice(FormStep.TIMING, this.records);
      this.response.emit(new FormResponse(FormStep.TIMING, this.records)); // tell parent component that form ist ok
    }
  }

  populateValues() {
    this.searchfields.forEach(/*SearchFlightComponent*/(item, idx) => {
      let airport = item.form.controls['airport'].value;
      let date = item.form.get('date').value;
      let hour = item.form.get('hour').value;
      let hourReal = item.form.get('hourReal').value;
      let record = { idx, airport, date, hour, hourReal };
      this.records.push(record);
    });
  }

  calculateDeltaTime(records) {
    let endHourPlanned: string = records[1].hour;
    let endHourPlannedNum: number = Number.parseInt(endHourPlanned.substring(0, endHourPlanned.indexOf(':')).trim());
    let endMinutePlannedNum: number = Number.parseInt(endHourPlanned.substring(endHourPlanned.indexOf(':') + 1).trim());

    let endHourReal: string = records[1].hourReal;
    let endHourRealNum: number = Number.parseInt(endHourReal.substring(0, endHourReal.indexOf(':')));
    let endMinuteRealNum: number = Number.parseInt(endHourReal.substring(endHourReal.indexOf(':') + 1).trim());

    let date = new Date(records[1].date);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    // console.log(endHourPlannedNum + ' ' + endMinutePlannedNum + ' ' + endHourRealNum + ' ' + endMinuteRealNum);

    if (endHourPlannedNum != endHourRealNum) {
      let planned = new Date(year, month, day, endHourPlannedNum, endMinutePlannedNum);
      let real = new Date(year, month, day, endHourRealNum, endMinuteRealNum);
      let ms = real.getTime() - planned.getTime();
      let sec = ms / 1000;
      let hours = sec / 3600;
      this.delayTime = hours;
      this.delay = hours >= 3 ? `${hours} Stunden verspätet` : `Verspätung liegt unter 3 Stunden (${hours})`;
    }
  }

}
