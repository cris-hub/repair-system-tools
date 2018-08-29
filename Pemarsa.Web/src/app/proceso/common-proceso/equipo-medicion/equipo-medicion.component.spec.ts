import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoMedicionComponent } from './equipo-medicion.component';

describe('EquipoMedicionComponent', () => {
  let component: EquipoMedicionComponent;
  let fixture: ComponentFixture<EquipoMedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoMedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoMedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
