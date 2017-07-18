import { DataCollectionService } from './../../services/data-collection.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-form-set',
  templateUrl: './form-set.component.html',
  styleUrls: ['./form-set.component.css']
})
export class FormSetComponent implements OnInit, OnDestroy {

  airports: any;
  subscription: Subscription;
  form: FormGroup;
  disabled: boolean;
  debug: true;

  constructor(private dcs: DataCollectionService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.getAirportLookups();
    this.createForm();
    this.toggle(); // nessesary UI fix for form input type select
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAirportLookups() {
    this.subscription = this.dcs.getAirportLookups().subscribe(data => this.airports = data.message);
  }

  toggleList() {
    $('.ui.dropdown').dropdown();
  }

  toggle() {
    $('#select').dropdown();
    $('#select2').dropdown();
  }

  createForm() {
    this.form = this.fb.group({
      flightNr: ['', Validators.required],
      flightDate: ['', Validators.required],
      flightType: ['', Validators.required],
      flightProblemCase: ['', Validators.required]
    })
  }

  show() {
    console.log(this.form);
  }

}