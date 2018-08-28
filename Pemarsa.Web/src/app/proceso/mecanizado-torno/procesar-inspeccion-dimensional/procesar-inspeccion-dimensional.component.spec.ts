import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarInspeccionDimensionalComponent } from './procesar-inspeccion-dimensional.component';

describe('ProcesarInspeccionDimensionalComponent', () => {
  let component: ProcesarInspeccionDimensionalComponent;
  let fixture: ComponentFixture<ProcesarInspeccionDimensionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesarInspeccionDimensionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarInspeccionDimensionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
