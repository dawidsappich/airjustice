import { FormResponse } from './../../models/form-response.model';
import { FormStep } from './../../models/form-step.model';

import { IFormResponse } from './../../models/form-response.interface';
import { DataCollectionService } from './../../services/data-collection.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.css']
})
export class InitialFormComponent implements OnInit, IFormResponse {

  @Output() response: EventEmitter<FormResponse> = new EventEmitter<FormResponse>();

  airports: any;
  subscription: Subscription;
  form: FormGroup;
  disabled: boolean;
  processing = false;
  debug = false;

  dummy = {
    type: '',
    list: '',
    display: '',
    values: [{
      display: '',
      value: '',
      order: 0,
      icon: ''
    }]
  }

  message: any;
  messageClass = '';


  problemType = this.dummy;
  flightType = this.dummy;

  constructor(
    private dcs: DataCollectionService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.loadFormFieldDescription();
    this.initForms();
  }

  initForms() {
    this.form = this.fb.group({
      flightNr: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        this.isAplhpaNumeric
      ])],
      flightDate: ['', Validators.compose([
        Validators.required,
        this.isValidDate
      ])],
      flightType: ['', Validators.compose([
        Validators.required
      ])],
      problemCase: ['', Validators.required]
    })
    // necessary to activate dropdown feature via sematic ui
    $('#select').dropdown();
    $('#select2').dropdown();
  }

  loadFormFieldDescription() {
    this.dcs.getFormFieldDescription('problem').subscribe(payload => {
      this.problemType = payload;
    })
    this.dcs.getFormFieldDescription('flightType').subscribe(payload => {
      this.flightType = payload;
    })
  }

  isAplhpaNumeric(controls) {
    const regex = new RegExp(/^[a-zA-Z0-9]+$/);
    return (regex.test(controls.value)) ? null : { notValidFlightNumber: true };
  }

  isValidDate(controls) {
    // https://stackoverflow.com/a/20773488
    const regex = new RegExp(/(^(((0[1-9]|1[0-9]|2[0-8])\.(0[1-9]|1[012]))|((29|30|31)\.(0[13578]|1[02]))|((29|30)\.(0[4,6,9]|11)))\.(19|[2-9][0-9])\d\d$)|(^29\.02\.(19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/);
    return (regex.test(controls.value)) ? null : { notValidDate: true };
  }

  processForm() {
    this.processing = true;
    this.disableForm();

    const record = {
      flightNr: this.form.get('flightNr').value,
      flightDate: new Date(this.form.get('flightDate').value),
      problemCase: this.form.get('problemCase').value,
      flightType: this.form.get('flightType').value
    }

    this.dcs.capture(record).subscribe(data => {
      this.message = data.message;
      if (!data.success) {
        this.messageClass = 'error';
      } else {
        this.messageClass = 'success';
        this.response.emit(new FormResponse(FormStep.INITIAL, true, true)); //emit value to parent form-container
        // info: setTimeout is only fpr developement
        setTimeout(() => {
          this.processing = false;
          this.message = '';
          this.form.reset();
          this.enableForm();
        }, 2000);
      }
    })
  }

  disableForm() {
    this.form.get('flightNr').disable();
    this.form.get('flightDate').disable();
    this.form.get('flightType').disable();
    this.form.get('problemCase').disable();
  }

  enableForm() {
    this.form.get('flightNr').enable();
    this.form.get('flightDate').enable();
    this.form.get('flightType').enable();
    this.form.get('problemCase').enable();
  }

}
