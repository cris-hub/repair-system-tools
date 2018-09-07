import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntarRemisionComponent } from './adjuntar-remision.component';

describe('AdjuntarRemisionComponent', () => {
  let component: AdjuntarRemisionComponent;
  let fixture: ComponentFixture<AdjuntarRemisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntarRemisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntarRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
