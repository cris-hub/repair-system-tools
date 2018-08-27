import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OitCambioProcesoComponent } from './oit-cambio-proceso.component';

describe('OitCambioProcesoComponent', () => {
  let component: OitCambioProcesoComponent;
  let fixture: ComponentFixture<OitCambioProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OitCambioProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OitCambioProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
