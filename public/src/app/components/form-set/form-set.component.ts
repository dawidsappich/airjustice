import { DataCollectionService } from './../../services/data-collection.service';
import { Component, OnInit } from '@angular/core';
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
      flightNr: ['', Validators.required],
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

}
