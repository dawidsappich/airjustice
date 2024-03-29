import { ReasonComponent } from './../components/reason/reason.component';
import { NoclaimComponent } from './../components/noclaim/noclaim.component';
import { ChoiceTrackerService } from './../services/choice-tracker.service';
import { InitialFormComponent } from './../components/initial-form/initial-form.component';
import { FlightTimingComponent } from './../components/flight-timing/flight-timing.component';

import { FormResponse } from './form-response.model';
import { FormStep } from "./form-step.model";

export class FormState {
	private currentStep: FormStep;
	private previousStep: FormStep;
	private nextStep: FormStep;
	private forms: Map<FormStep, any>;

	constructor(private userChoices: ChoiceTrackerService) {
		this.init();
	}

	init() {
		this.currentStep = FormStep.INITIAL;
		this.previousStep = FormStep.INITIAL;
		this.nextStep = FormStep.TIMING;
		this.forms = new Map();
		this.forms.set(FormStep.INITIAL, InitialFormComponent);
		this.forms.set(FormStep.TIMING, FlightTimingComponent);
		this.forms.set(FormStep.NOCALIM, NoclaimComponent);
		this.forms.set(FormStep.REASON, ReasonComponent);
	}

	getCurrentStep(): FormStep {
		return this.currentStep;
	}

	getnextForm(response: FormResponse) {
		/**
		 * EPK 1
		 */
		if (response.origin === FormStep.INITIAL) {
			if (response.results && response.results.flightType === 'directFlight') {
				this.currentStep = FormStep.TIMING;
				return this.forms.get(this.getCurrentStep());
			}
			if (response.results && response.results.flightType === 'indirectFlight') {
				console.log('TODO: Load Form with multiple flights');
			}
		}

		/**
		 * EPK 1.1
		 */
		if (response.origin === FormStep.TIMING) {
			if (this.userChoices.getChoice(FormStep.INITIAL).problemCase === 'delayedFlight' && response.results[response.results.length - 1].flightDelayedAmount >= 3) {
				this.currentStep = FormStep.REASON;
				return this.forms.get(this.getCurrentStep());
			} else if (this.userChoices.getChoice(FormStep.INITIAL).problemCase === 'delayedFlight' && response.results[response.results.length - 1].flightDelayedAmount < 3) {
				this.currentStep = FormStep.NOCALIM;
				return this.forms.get(this.getCurrentStep());
			}
		}

		/**
		 * EPK 2
		 */
		if (response.origin === FormStep.REASON) {
			if (response.results.reason === 'strikeReason' || response.results.reason === 'weatherReason') {
				this.currentStep = FormStep.NOCALIM
				return this.forms.get(this.getCurrentStep());
			}
		}
	}

	getCurrentForm() {
		return this.forms.get(this.getCurrentStep());
	}

}