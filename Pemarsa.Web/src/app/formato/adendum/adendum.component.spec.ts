import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdendumComponent } from './adendum.component';

describe('AdendumComponent', () => {
  let component: AdendumComponent;
  let fixture: ComponentFixture<AdendumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdendumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
