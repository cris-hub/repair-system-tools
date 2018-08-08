import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LPIComponent } from './lpi.component';

describe('LPIComponent', () => {
  let component: LPIComponent;
  let fixture: ComponentFixture<LPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
