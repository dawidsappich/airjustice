import { FormStep } from "./form-step.model";

export class FormResponse {

	origin: FormStep;
	isValid: boolean;
	isComplete: boolean;

	constructor(step: FormStep, isValid: boolean, isComplete) {
		this.origin = step;
		this.isValid = isValid;
		this.isComplete = isComplete;
	}
}