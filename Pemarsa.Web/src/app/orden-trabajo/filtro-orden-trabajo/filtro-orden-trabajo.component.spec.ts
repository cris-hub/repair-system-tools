import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroOrdenTrabajoComponent } from './filtro-orden-trabajo.component';

describe('FiltroOrdenTrabajoComponent', () => {
  let component: FiltroOrdenTrabajoComponent;
  let fixture: ComponentFixture<FiltroOrdenTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroOrdenTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
