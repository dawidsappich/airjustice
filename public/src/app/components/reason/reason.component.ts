import { ChoiceTrackerService } from './../../services/choice-tracker.service';
import { DataCollectionService } from './../../services/data-collection.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormResponse } from './../../models/form-response.interface';
import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit, EmbeddedViewRef } from '@angular/core';
import { FormResponse } from './../../models/form-response.model';
import { FormStep } from './../../models/form-step.model';

declare var $: any;

@Component({
  selector: 'reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.css']
})
export class ReasonComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  formfieldvalues: any;
  isTextAeraVisible = false;
  textaeraView: EmbeddedViewRef<any>;
  processing = false;


  @Output() response: EventEmitter<FormResponse> = new EventEmitter<FormResponse>();
  @ViewChild('tpl', { read: TemplateRef }) template: TemplateRef<any>;

  constructor(private container: ViewContainerRef, private fb: FormBuilder, private dcs: DataCollectionService, private userChoice: ChoiceTrackerService) { }

  ngOnInit() {
    this.loadFormFieldDescription();
    this.form = this.fb.group({
      reason: ['', Validators.required]
    });
    $('#reasonList').dropdown();

  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(value => {
      if (value.reason == 'differentReason' && !this.isTextAeraVisible) {
        // add additional textfield to viewcontainer so that user can
        this.isTextAeraVisible = true;
        this.textaeraView = this.container.createEmbeddedView(this.template);
      } else if (this.isTextAeraVisible) {
        this.isTextAeraVisible = false;
        this.container.remove(this.container.indexOf(this.textaeraView));
      }
    });
  }

  loadFormFieldDescription() {
    this.dcs.getFormFieldDescription('reason').subscribe(payload => {
      this.formfieldvalues = payload;
    });
  }

  process() {
    if (this.form.valid) {
      this.processing = true;
      this.disableForm();
      let record = { reason: this.form.get('reason').value };
      this.response.emit(new FormResponse(FormStep.REASON, record));
    }
  }

  disableForm() {
    this.form.get('reason').disable();
    this.form.disable();
  }

  enableForm() {
    this.form.get('reason').enable();
    this.form.enable();
  }



}
