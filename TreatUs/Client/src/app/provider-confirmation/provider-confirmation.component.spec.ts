import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderConfirmationComponent } from './provider-confirmation.component';

describe('ProviderConfirmationComponent', () => {
  let component: ProviderConfirmationComponent;
  let fixture: ComponentFixture<ProviderConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
