import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionRechazoComponent } from './observacion-rechazo.component';

describe('ObservacionRechazoComponent', () => {
  let component: ObservacionRechazoComponent;
  let fixture: ComponentFixture<ObservacionRechazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionRechazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionRechazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
