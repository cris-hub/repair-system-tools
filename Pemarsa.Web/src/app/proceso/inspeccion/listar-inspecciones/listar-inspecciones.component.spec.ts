import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInspeccionesComponent } from './listar-inspecciones.component';

describe('ListarInspeccionesComponent', () => {
  let component: ListarInspeccionesComponent;
  let fixture: ComponentFixture<ListarInspeccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInspeccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInspeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
