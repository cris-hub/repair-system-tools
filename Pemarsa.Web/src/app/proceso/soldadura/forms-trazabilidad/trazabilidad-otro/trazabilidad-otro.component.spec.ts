import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadOtroComponent } from './trazabilidad-otro.component';

describe('TrazabilidadOtroComponent', () => {
  let component: TrazabilidadOtroComponent;
  let fixture: ComponentFixture<TrazabilidadOtroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazabilidadOtroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadOtroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
