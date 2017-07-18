import { AirportSearchResult } from './../../models/AirportSearchResult';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataCollectionService } from './../../services/data-collection.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-direct-flight',
  templateUrl: './direct-flight.component.html',
  styleUrls: ['./direct-flight.component.css']
})
export class DirectFlightComponent implements OnInit {

  form: FormGroup;
  resultsStart: AirportSearchResult[];
  resultsEnd: AirportSearchResult[];

  constructor(private fb: FormBuilder, private dcs: DataCollectionService) { }

  ngOnInit() {
    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
    this.resultsStart = [];
  }

  searchValue(value, target) {
    if (value && value != '') {
      this.resultsStart = [];
      this.resultsEnd = [];
      if (value.length > 1) {
        this.dcs.getAirport(value).subscribe(data => {
          if (target == 'start'){
            this.resultsStart = data.message;
          }
          if (target == 'end'){
            this.resultsEnd = data.message;
          }
        });
      }
    }
  }

  addValue(value, field) {
    this.form.get(field).setValue(value);
    this.resultsStart = [];
    this.resultsEnd = [];
  }

}
