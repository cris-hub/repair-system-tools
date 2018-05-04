import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarAccionComponent } from './confirmar-accion.component';

describe('ConfirmarAccionComponent', () => {
  let component: ConfirmarAccionComponent;
  let fixture: ComponentFixture<ConfirmarAccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarAccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
