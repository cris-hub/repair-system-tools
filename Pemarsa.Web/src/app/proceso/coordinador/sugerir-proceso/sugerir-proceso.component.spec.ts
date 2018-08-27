import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerirProcesoComponent } from './sugerir-proceso.component';

describe('SugerirProcesoComponent', () => {
  let component: SugerirProcesoComponent;
  let fixture: ComponentFixture<SugerirProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugerirProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SugerirProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
