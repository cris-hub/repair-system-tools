import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexionInspeccionComponent } from './conexion-inspeccion.component';

describe('ConexionInspeccionComponent', () => {
  let component: ConexionInspeccionComponent;
  let fixture: ComponentFixture<ConexionInspeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexionInspeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexionInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
