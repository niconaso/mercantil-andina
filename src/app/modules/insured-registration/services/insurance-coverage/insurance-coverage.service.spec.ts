import { TestBed } from '@angular/core/testing';

import { InsuranceCoverageService } from './insurance-coverage.service';

describe('InsuranceCoverageService', () => {
  let service: InsuranceCoverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCoverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
