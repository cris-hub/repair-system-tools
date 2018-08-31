import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadEstructuralComponent } from './trazabilidad-estructural.component';

describe('TrazabilidadEstructuralComponent', () => {
  let component: TrazabilidadEstructuralComponent;
  let fixture: ComponentFixture<TrazabilidadEstructuralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazabilidadEstructuralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadEstructuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
