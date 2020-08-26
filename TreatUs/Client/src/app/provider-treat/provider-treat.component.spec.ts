import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTreatComponent } from './provider-treat.component';

describe('ProviderTreatComponent', () => {
  let component: ProviderTreatComponent;
  let fixture: ComponentFixture<ProviderTreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderTreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
