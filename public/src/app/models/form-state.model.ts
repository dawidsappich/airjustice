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
		this.forms.set(FormStep.TIMING, FlightTimingComponent)
	}

	getCurrentStep(): FormStep {
		return this.currentStep;
	}

	getnextForm(response: FormResponse) {
		if (response.origin === FormStep.INITIAL) {
			if (response.results && response.results.flightType === 'directFlight') {
				this.currentStep = FormStep.TIMING;
				return this.forms.get(this.getCurrentStep());
			}
			if (response.results && response.results.flightType === 'indirectFlight') {
				console.log('TODO: Load Form with multiple flights');
			}
		}

		if (response.origin === FormStep.TIMING) {
			if (this.userChoices.getChoice(FormStep.INITIAL).problemCase === 'delayedFlight') {
				console.log('DELAYED FLIGHT');
			}
		}
	}

	getCurrentForm() {
		return this.forms.get(this.getCurrentStep());
	}

}