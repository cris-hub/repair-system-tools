import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberarProcesoRemisionComponent } from './liberar-proceso-remision.component';

describe('LiberarProcesoRemisionComponent', () => {
  let component: LiberarProcesoRemisionComponent;
  let fixture: ComponentFixture<LiberarProcesoRemisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiberarProcesoRemisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiberarProcesoRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
