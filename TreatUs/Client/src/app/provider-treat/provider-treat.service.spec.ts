import { TestBed } from '@angular/core/testing';

import { ProviderTreatService } from './provider-treat.service';

describe('ProviderTreatService', () => {
  let service: ProviderTreatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderTreatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
