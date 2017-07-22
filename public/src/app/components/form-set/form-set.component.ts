import { DataCollectionService } from './../../services/data-collection.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-form-set',
  templateUrl: './form-set.component.html',
  styleUrls: ['./form-set.component.css']
})
export class FormSetComponent implements OnInit {

  airports: any;
  subscription: Subscription;
  form: FormGroup;
  disabled: boolean;
  loading = true;

  problemType = {};
  flightType = {}
  @Input() test: string;

  constructor(
    private dcs: DataCollectionService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadFormFieldDescription();
    this.initForms();
  }

  getAirportLookups() {
    this.subscription = this.dcs.getAirportLookups().subscribe(payload => this.airports = payload.message);
  }

  initForms() {
    this.form = this.fb.group({
      flightNr: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        this.isAplhpaNumeric
      ])],
      flightDate:[''],
      flightType: ['', Validators.required],
      flightProblemCase: ['', Validators.required]
    })
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

  show() {
    console.log(this.test);
  }

}
