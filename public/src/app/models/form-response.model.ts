import { FormStep } from "./form-step.model";

export class FormResponse {

	origin: FormStep;
	isValid: boolean;
	isComplete: boolean;
	results: any;

	constructor(step: FormStep, results = {}, isValid = true, isComplete = true) {
		this.origin = step;
		this.isValid = isValid;
		this.isComplete = isComplete;
		this.results = results;
	}
}