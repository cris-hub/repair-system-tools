import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProcesoComponent } from './asignar-proceso.component';

describe('AsignarProcesoComponent', () => {
  let component: AsignarProcesoComponent;
  let fixture: ComponentFixture<AsignarProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
