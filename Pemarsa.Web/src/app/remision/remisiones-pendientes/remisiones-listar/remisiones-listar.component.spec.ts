import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemisionesListarComponent } from './remisiones-listar.component';

describe('RemisionesListarComponent', () => {
  let component: RemisionesListarComponent;
  let fixture: ComponentFixture<RemisionesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemisionesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemisionesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
