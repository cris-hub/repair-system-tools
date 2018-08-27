import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlistamientoProcesarComponent } from './alistamiento-procesar.component';

describe('AlistamientoProcesarComponent', () => {
  let component: AlistamientoProcesarComponent;
  let fixture: ComponentFixture<AlistamientoProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlistamientoProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlistamientoProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
