import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOitComponent } from './listar-oit.component';

describe('ListarOitComponent', () => {
  let component: ListarOitComponent;
  let fixture: ComponentFixture<ListarOitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarOitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
