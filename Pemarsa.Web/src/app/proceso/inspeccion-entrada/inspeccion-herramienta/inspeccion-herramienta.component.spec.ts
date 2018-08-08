import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionHerramientaComponent } from './inspeccion-herramienta.component';

describe('InspeccionHerramientaComponent', () => {
  let component: InspeccionHerramientaComponent;
  let fixture: ComponentFixture<InspeccionHerramientaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspeccionHerramientaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
