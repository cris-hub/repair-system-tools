import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlistamientoListarComponent } from './alistamiento-listar.component';

describe('AlistamientoListarComponent', () => {
  let component: AlistamientoListarComponent;
  let fixture: ComponentFixture<AlistamientoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlistamientoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlistamientoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
