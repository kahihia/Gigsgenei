import { TestBed, inject } from '@angular/core/testing';

import { AlertserviceService } from './alertservice.service';

describe('AlertserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertserviceService]
    });
  });

  it('should be created', inject([AlertserviceService], (service: AlertserviceService) => {
    expect(service).toBeTruthy();
  }));
});
