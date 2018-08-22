import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanizadoFresaProcesarComponent } from './mecanizado-fresa-procesar.component';

describe('MecanizadoFresaProcesarComponent', () => {
  let component: MecanizadoFresaProcesarComponent;
  let fixture: ComponentFixture<MecanizadoFresaProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanizadoFresaProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanizadoFresaProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
