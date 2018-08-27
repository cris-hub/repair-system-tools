import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarOitComponent } from './procesar-oit.component';

describe('ProcesarOitComponent', () => {
  let component: ProcesarOitComponent;
  let fixture: ComponentFixture<ProcesarOitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesarOitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarOitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
