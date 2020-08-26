import { TestBed } from '@angular/core/testing';

import { MyTreatService } from './my-treat.service';

describe('MyTreatService', () => {
  let service: MyTreatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTreatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
