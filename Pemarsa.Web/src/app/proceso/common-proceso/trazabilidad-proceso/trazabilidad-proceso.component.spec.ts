import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadProcesoComponent } from './trazabilidad-proceso.component';

describe('TrazabilidadProcesoComponent', () => {
  let component: TrazabilidadProcesoComponent;
  let fixture: ComponentFixture<TrazabilidadProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazabilidadProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
