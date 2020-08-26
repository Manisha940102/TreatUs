import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTreatComponent } from './my-treat.component';

describe('MyTreatComponent', () => {
  let component: MyTreatComponent;
  let fixture: ComponentFixture<MyTreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
