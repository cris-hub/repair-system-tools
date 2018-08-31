import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrazabilidadComponent } from './form-trazabilidad.component';

describe('FormTrazabilidadComponent', () => {
  let component: FormTrazabilidadComponent;
  let fixture: ComponentFixture<FormTrazabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTrazabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTrazabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
