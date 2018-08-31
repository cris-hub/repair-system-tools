import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadBrocasComponent } from './trazabilidad-brocas.component';

describe('TrazabilidadBrocasComponent', () => {
  let component: TrazabilidadBrocasComponent;
  let fixture: ComponentFixture<TrazabilidadBrocasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazabilidadBrocasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadBrocasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
