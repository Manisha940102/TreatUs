import { TestBed } from '@angular/core/testing';

import { ProviderRestaurantService } from './provider-restaurant.service';

describe('ProviderRestaurantService', () => {
  let service: ProviderRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
