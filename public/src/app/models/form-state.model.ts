import { InitialFormComponent } from './../components/initial-form/initial-form.component';
import { FlightTimingComponent } from './../components/flight-timing/flight-timing.component';

import { FormResponse } from './form-response.model';
import { FormStep } from "./form-step.model";

export class FormState {
	private currentStep: FormStep;
	private previousStep: FormStep;
	private nextStep: FormStep;
	private forms: Map<FormStep, any>;

	constructor() {
		this.init();
	}

	init() {
		this.currentStep = FormStep.INITIAL;
		this.previousStep = FormStep.INITIAL;
		this.nextStep = FormStep.TIMING;
		this.forms = new Map();
		this.forms.set(FormStep.INITIAL, InitialFormComponent);
		this.forms.set(FormStep.TIMING, FlightTimingComponent)
	}

	getCurrentStep(): FormStep {
		return this.currentStep;
	}

	getnextForm(response: FormResponse) {
		if (response.origin === FormStep.INITIAL) {
			this.currentStep = FormStep.TIMING;
			// TODO: check deatils form formResponse
			return this.forms.get(this.getCurrentStep());
		}

		if (response.origin === FormStep.TIMING) {
			this.currentStep = FormStep.REASON;
			return this.forms.get(this.getCurrentStep());
		}
	}

	getCurrentForm() {
		return this.forms.get(this.getCurrentStep());
	}

}