import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFormatoComponent } from './listar-formato.component';

describe('ListarFormatoComponent', () => {
  let component: ListarFormatoComponent;
  let fixture: ComponentFixture<ListarFormatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarFormatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
