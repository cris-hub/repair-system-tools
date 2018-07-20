import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualDimensionalComponent } from './visualdimencional.component';

describe('VisualdimencionalComponent', () => {
  let component: VisualDimensionalComponent;
  let fixture: ComponentFixture<VisualDimensionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualDimensionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualDimensionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
