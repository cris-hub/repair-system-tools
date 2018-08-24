import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanizadoFresaListarComponent } from './mecanizado-fresa-listar.component';

describe('MecanizadoFresaListarComponent', () => {
  let component: MecanizadoFresaListarComponent;
  let fixture: ComponentFixture<MecanizadoFresaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanizadoFresaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanizadoFresaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
