import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  flightDate: FormControl;

  constructor() { }

  ngOnInit() {
    this.flightDate = new FormControl('', Validators.required);
    // initialize the datepicker
    this.initializeDatePicker();
  }

  initializeDatePicker() {
    $('#datepicker').calendar({
      type: 'date',
      firstDayOfWeek: 1,
      text: {
        days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Heute',
        now: 'Jetzt'
      }
    });
  }


}
