import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectificadoProcesarComponent } from './rectificado-procesar.component';

describe('RectificadoProcesarComponent', () => {
  let component: RectificadoProcesarComponent;
  let fixture: ComponentFixture<RectificadoProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectificadoProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectificadoProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
