import { Component, OnInit, EventEmitter, Output, Input, AfterContentInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, AfterContentInit {

  flightDate: FormControl;
  @Input() idSelector: string;

  constructor() { }

  ngOnInit() {
    this.flightDate = new FormControl('', Validators.required);
    // initialize the datepicker
    // this.initializeDatePicker();
  }

  ngAfterContentInit() {
    this.initializeDatePicker();
  }

  initializeDatePicker() {
    $('#' + this.idSelector).calendar({
      type: 'time',
      firstDayOfWeek: 1,
      text: {
        days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Heute',
        now: 'Jetzt'
      },
      formatter: {
        time: (date, settings, forCalender) => {
          const time = date.getHours() + 1;
          const min = date.getMinutes();
          const minFormatted = min.toString().length > 1 ? min : '0' + min;
          return `${time}:${minFormatted}`;
        }
      }
    });
  }


}
