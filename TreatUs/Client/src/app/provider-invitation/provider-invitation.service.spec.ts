import { TestBed } from '@angular/core/testing';

import { ProviderInvitationService } from './provider-invitation.service';

describe('ProviderInvitationService', () => {
  let service: ProviderInvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderInvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
