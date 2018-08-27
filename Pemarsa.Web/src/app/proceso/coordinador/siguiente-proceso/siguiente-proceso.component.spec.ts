import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiguienteProcesoComponent } from './siguiente-proceso.component';

describe('SiguienteProcesoComponent', () => {
  let component: SiguienteProcesoComponent;
  let fixture: ComponentFixture<SiguienteProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiguienteProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiguienteProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
