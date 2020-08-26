import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTreatComponent } from './admin-treat.component';

describe('AdminTreatComponent', () => {
  let component: AdminTreatComponent;
  let fixture: ComponentFixture<AdminTreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
