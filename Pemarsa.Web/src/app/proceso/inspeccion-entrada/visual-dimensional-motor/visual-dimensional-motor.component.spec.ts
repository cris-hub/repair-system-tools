import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualDimensionalMotorComponent } from './visual-dimensional-motor.component';

describe('VisualdimencionalComponent', () => {
  let component: VisualDimensionalMotorComponent;
  let fixture: ComponentFixture<VisualDimensionalMotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualDimensionalMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualDimensionalMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
