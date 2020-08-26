import { TestBed } from '@angular/core/testing';

import { RestaurantsDetailsService } from './restaurants-details.service';

describe('RestaurantsDetailsService', () => {
  let service: RestaurantsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
