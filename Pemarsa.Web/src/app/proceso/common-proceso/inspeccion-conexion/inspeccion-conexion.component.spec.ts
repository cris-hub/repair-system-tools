import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionConexionComponent } from './inspeccion-conexion.component';

describe('InspeccionConexionComponent', () => {
  let component: InspeccionConexionComponent;
  let fixture: ComponentFixture<InspeccionConexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspeccionConexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionConexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
