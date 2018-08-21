import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMecanizadoComponent } from './listar-mecanizado.component';

describe('ListarMecanizadoComponent', () => {
  let component: ListarMecanizadoComponent;
  let fixture: ComponentFixture<ListarMecanizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarMecanizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMecanizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
