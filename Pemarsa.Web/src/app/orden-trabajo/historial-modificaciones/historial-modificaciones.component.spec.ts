import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialModificacionesComponent } from './historial-modificaciones.component';

describe('HistorialModificacionesComponent', () => {
  let component: HistorialModificacionesComponent;
  let fixture: ComponentFixture<HistorialModificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialModificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialModificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
