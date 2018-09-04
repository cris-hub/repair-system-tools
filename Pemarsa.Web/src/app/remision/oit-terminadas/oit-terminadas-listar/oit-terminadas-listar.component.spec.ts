import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OitTerminadasListarComponent } from './oit-terminadas-listar.component';

describe('OitTerminadasListarComponent', () => {
  let component: OitTerminadasListarComponent;
  let fixture: ComponentFixture<OitTerminadasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OitTerminadasListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OitTerminadasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
