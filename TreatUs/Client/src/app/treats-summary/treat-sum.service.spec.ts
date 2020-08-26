import { TestBed } from '@angular/core/testing';

import { TreatSumService } from './treat-sum.service';

describe('TreatSumService', () => {
  let service: TreatSumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatSumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
