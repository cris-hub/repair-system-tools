import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionRemisionPendienteComponent } from './observacion-remision-pendiente.component';

describe('ObservacionRemisionPendienteComponent', () => {
  let component: ObservacionRemisionPendienteComponent;
  let fixture: ComponentFixture<ObservacionRemisionPendienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionRemisionPendienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionRemisionPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
