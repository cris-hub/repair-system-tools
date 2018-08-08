import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EMIComponent } from './emi.component';

describe('EMIComponent', () => {
  let component: EMIComponent;
  let fixture: ComponentFixture<EMIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EMIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
