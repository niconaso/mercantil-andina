import { TestBed } from '@angular/core/testing';

import { PasswordValidatorService } from './password.validator';

describe('PasswordValidatorService', () => {
  let service: PasswordValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
