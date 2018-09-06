import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionRemisionComponent } from './observacion-remision.component';

describe('ObservacionRemisionComponent', () => {
  let component: ObservacionRemisionComponent;
  let fixture: ComponentFixture<ObservacionRemisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionRemisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
