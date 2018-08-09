import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInspeccionesSalidaComponent } from './listar-inspecciones.component';

describe('ListarInspeccionesComponent', () => {
  let component: ListarInspeccionesSalidaComponent;
  let fixture: ComponentFixture<ListarInspeccionesSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInspeccionesSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInspeccionesSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
