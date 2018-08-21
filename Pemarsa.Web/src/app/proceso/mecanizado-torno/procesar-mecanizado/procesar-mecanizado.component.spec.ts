import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarMecanizadoComponent } from './procesar-mecanizado.component';

describe('ProcesarMecanizadoComponent', () => {
  let component: ProcesarMecanizadoComponent;
  let fixture: ComponentFixture<ProcesarMecanizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesarMecanizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarMecanizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
