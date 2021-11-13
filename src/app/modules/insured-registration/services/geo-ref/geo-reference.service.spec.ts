import { TestBed } from '@angular/core/testing';

import { GeoReferenceService } from './geo-reference.service';

describe('GeoReferenceService', () => {
  let service: GeoReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
