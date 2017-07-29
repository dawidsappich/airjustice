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
	}

	getCurrentStep(): FormStep {
		return this.currentStep;
	}

	getNextStep() {
	}

	getCurrentForm() {
		return this.forms.get(this.getCurrentStep());
	}

}