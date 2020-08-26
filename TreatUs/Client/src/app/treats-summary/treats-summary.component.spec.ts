import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatsSummaryComponent } from './treats-summary.component';

describe('TreatsSummaryComponent', () => {
  let component: TreatsSummaryComponent;
  let fixture: ComponentFixture<TreatsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
