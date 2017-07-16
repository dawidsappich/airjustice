import { TestBed, inject } from '@angular/core/testing';

import { DataCollectionService } from './data-collection.service';

describe('DataCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCollectionService]
    });
  });

  it('should be created', inject([DataCollectionService], (service: DataCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
