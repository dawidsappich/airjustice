import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-direct-flight',
  templateUrl: './direct-flight.component.html',
  styleUrls: ['./direct-flight.component.css']
})
export class DirectFlightComponent implements OnInit {

  form: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

}
