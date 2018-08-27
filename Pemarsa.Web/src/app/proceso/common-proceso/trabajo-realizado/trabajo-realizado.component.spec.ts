import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoRealizadoComponent } from './trabajo-realizado.component';

describe('TrabajoRealizadoComponent', () => {
  let component: TrabajoRealizadoComponent;
  let fixture: ComponentFixture<TrabajoRealizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajoRealizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
