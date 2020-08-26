import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRestaurantComponent } from './provider-restaurant.component';

describe('ProviderRestaurantComponent', () => {
  let component: ProviderRestaurantComponent;
  let fixture: ComponentFixture<ProviderRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
