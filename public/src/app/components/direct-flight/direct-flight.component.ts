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

  constructor(private fb: FormBuilder, private dcs: DataCollectionService) { }

  ngOnInit() {
    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  searchValue(value) {
    if (value && value != '' && value.length > 1) {
      this.dcs.getAirport(value).subscribe(data => console.log(data));
    }
  }

}
