import { TestBed } from '@angular/core/testing';

import { ProviderConfirmationService } from './provider-confirmation.service';

describe('ProviderConfirmationService', () => {
  let service: ProviderConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
