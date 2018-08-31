import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarInspeccionComponent } from './procesar-inspeccion.component';

describe('ProcesarInspeccionComponent', () => {
  let component: ProcesarInspeccionComponent;
  let fixture: ComponentFixture<ProcesarInspeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesarInspeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
