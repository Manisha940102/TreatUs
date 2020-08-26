import { TestBed } from '@angular/core/testing';
import { AdminTreatService } from './admin-treat.service';

describe('AdminTreatService', () => {
  let service: AdminTreatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTreatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
