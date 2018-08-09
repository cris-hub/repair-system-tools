import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInspeccionesEntradaComponent } from './listar-inspecciones.component';

describe('ListarInspeccionesComponent', () => {
  let component: ListarInspeccionesEntradaComponent;
  let fixture: ComponentFixture<ListarInspeccionesEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInspeccionesEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInspeccionesEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
