import { FormStep } from "./form-step.model";

export class FormState {
	private currentStep: FormStep;
	private previousStep: FormStep;
	private nextStep: FormStep;

	constructor() {
		this.currentStep = FormStep.INITIAL;
		this.previousStep = FormStep.INITIAL;
		this.nextStep = FormStep.TIMING;
	}

	getCurrentStep(): FormStep {
		return this.currentStep;
	}

	setNextStep(step: FormStep): FormStep {
		return this.nextStep = step;
	}

}