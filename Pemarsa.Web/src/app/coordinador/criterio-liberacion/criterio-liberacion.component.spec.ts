import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioLiberacionComponent } from './criterio-liberacion.component';

describe('CriterioLiberacionComponent', () => {
  let component: CriterioLiberacionComponent;
  let fixture: ComponentFixture<CriterioLiberacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterioLiberacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterioLiberacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
