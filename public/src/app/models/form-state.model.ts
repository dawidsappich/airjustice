import { SearchFlightComponent } from './../components/search-flight/search-flight.component';
import { FormResponse } from './form-response.model';
import { InitialFormComponent } from './../components/initial-form/initial-form.component';
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
		this.forms.set(FormStep.TIMING, SearchFlightComponent)
	}

	getCurrentStep(): FormStep {
		return this.currentStep;
	}

	getnextForm(response: FormResponse) {
		if (response.origin === FormStep.INITIAL) {
			this.currentStep = FormStep.TIMING;
			return this.forms.get(this.getCurrentStep());
		}
	}

	getCurrentForm() {
		return this.forms.get(this.getCurrentStep());
	}

}