import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectificadoListarComponent } from './rectificado-listar.component';

describe('RectificadoListarComponent', () => {
  let component: RectificadoListarComponent;
  let fixture: ComponentFixture<RectificadoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectificadoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectificadoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
