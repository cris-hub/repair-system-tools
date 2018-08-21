import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProcesoComponent } from './filtro-proceso.component';

describe('FiltroProcesoComponent', () => {
  let component: FiltroProcesoComponent;
  let fixture: ComponentFixture<FiltroProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
