/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobCatagoryService } from './job-catagory.service';

describe('JobCatagoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobCatagoryService]
    });
  });

  it('should ...', inject([JobCatagoryService], (service: JobCatagoryService) => {
    expect(service).toBeTruthy();
  }));
});
