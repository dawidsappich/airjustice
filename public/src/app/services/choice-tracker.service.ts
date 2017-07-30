import { Injectable } from '@angular/core';
import { FormStep } from '../models/form-step.model'

@Injectable()
export class ChoiceTrackerService {

  private choices: Map<FormStep, any>;

  constructor() {
    this.choices = new Map<FormStep, any>();
  }

  addChcoice(key: FormStep, value: any): void {
    this.choices.set(key, value);
  }

  getChoice(key: FormStep): any {
    return this.choices.get(key);
  }

  getSummary(): IterableIterator<[FormStep, any]> {
    return this.choices.entries();
  }

  updateChoice(key, value): { succes: boolean, message?: any } {
    const entry = this.choices.get(key);
    if (entry) {
      this.choices.set(entry, value);
      return { succes: true };
    } else {
      return { succes: false, message: `entry for ${key} not found` };
    }
  }

  reset(): void {
    this.choices.clear();
  }

}
