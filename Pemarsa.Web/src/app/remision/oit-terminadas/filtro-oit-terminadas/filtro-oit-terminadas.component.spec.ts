import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroOitTerminadasComponent } from './filtro-oit-terminadas.component';

describe('FiltroOitTerminadasComponent', () => {
  let component: FiltroOitTerminadasComponent;
  let fixture: ComponentFixture<FiltroOitTerminadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroOitTerminadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroOitTerminadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
