import { Subscription } from 'rxjs/Subscription';
import { FormResponse } from './../../models/form-response.model';
import { FormStep } from './../../models/form-step.model';
import { IFormResponse } from './../../models/form-response.interface';
import { InitialFormComponent } from './../initial-form/initial-form.component';
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, Input } from '@angular/core';
import { FormState } from "../../models/form-state.model";

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {

  response: FormResponse;
  subscriptions: Map<FormStep, Subscription>;

  private state: FormState;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
    this.state = new FormState();
    this.subscriptions = new Map<FormStep, Subscription>();
    this.response = new FormResponse(FormStep.ROOT);
  }

  ngOnInit() {
    this.renderForm(this.state.getCurrentForm());
  }

  renderForm(form: any) {
    const componentFactory = this.resolver.resolveComponentFactory(form);
    const ref = this.container.createComponent(componentFactory);
    const instance = <IFormResponse>ref.instance;
    const subscription = instance.response.subscribe(response => {
      this.response = response;
      this.checkFormResponse();
    });
    this.subscriptions.set(this.state.getCurrentStep(), subscription); //collect subscriptions to unssubscribe later
  }

  checkFormResponse() {
    if (this.response.isValid) {
      const form = this.state.getnextForm(this.response);
      if (form) {
        this.renderForm(form);
      }
    }
  }

  unsubscribe() {
    this.subscriptions.get(FormStep.INITIAL).unsubscribe();
  }

}
