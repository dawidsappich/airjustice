import { Injectable } from '@angular/core';

@Injectable()
export class ChoiceTrackerService {

  private choices: Map<string, string>;

  constructor() {
    this.choices = new Map<string, string>();
  }

  addChcoice(key: string, value: string): void {
    this.choices.set(key, value);
  }

  getChoice(key: string): string {
    return this.choices.get(key);
  }

  getSummary(): IterableIterator<[string, string]> {
    return this.choices.entries();
  }

  updateChoice(key, value): { succes: boolean, message?: string } {
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
