import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadPtaComponent } from './trazabilidad-pta.component';

describe('TrazabilidadPtaComponent', () => {
  let component: TrazabilidadPtaComponent;
  let fixture: ComponentFixture<TrazabilidadPtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazabilidadPtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadPtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
