import { ChoiceTrackerService } from './../../services/choice-tracker.service';
import { IFormResponse } from './../../models/form-response.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormResponse } from './../../models/form-response.model';

@Component({
  selector: 'app-noclaim',
  templateUrl: './noclaim.component.html',
  styleUrls: ['./noclaim.component.css']
})
export class NoclaimComponent implements OnInit, IFormResponse {

  @Output() response: EventEmitter<FormResponse> = new EventEmitter<FormResponse>();

  constructor(private userChoices: ChoiceTrackerService) { }

  ngOnInit() {
  }

}
