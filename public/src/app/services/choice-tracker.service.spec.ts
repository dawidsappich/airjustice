import { TestBed, inject } from '@angular/core/testing';

import { ChoiceTrackerService } from './choice-tracker.service';

describe('ChoiceTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoiceTrackerService]
    });
  });

  it('should be created', inject([ChoiceTrackerService], (service: ChoiceTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
