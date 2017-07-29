import { EventEmitter } from '@angular/core';
import { FormResponse } from './form-response.model'
export interface IFormResponse {
	response: EventEmitter<FormResponse>;
}