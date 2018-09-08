import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRemisionesComponent } from './filtro-remisiones.component';

describe('FiltroRemisionesComponent', () => {
  let component: FiltroRemisionesComponent;
  let fixture: ComponentFixture<FiltroRemisionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroRemisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRemisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
