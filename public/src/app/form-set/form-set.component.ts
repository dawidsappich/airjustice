import { DataCollectionService } from './../services/data-collection.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'form-set',
  templateUrl: './form-set.component.html',
  styleUrls: ['./form-set.component.css']
})
export class FormSetComponent implements OnInit, OnDestroy {

  airports: any;
  subscription: Subscription;
  form: FormGroup;

  constructor(private dcs: DataCollectionService, private fb: FormBuilder) { }

  ngOnInit() {
    this.fetchData();
    this.form = this.fb.group({
      flightNr: ['', Validators.required],
      flightDate: ['', Validators.required],
      flightType: ['', Validators.required],
      flightProblemCase:['',Validators.required]
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchData() {
    this.subscription = this.dcs.getAirportLookups().subscribe(data => this.airports = data.message);
  }

}
