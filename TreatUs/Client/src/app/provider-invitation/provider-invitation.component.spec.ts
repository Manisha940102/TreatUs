import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInvitationComponent } from './provider-invitation.component';

describe('ProviderInvitationComponent', () => {
  let component: ProviderInvitationComponent;
  let fixture: ComponentFixture<ProviderInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
