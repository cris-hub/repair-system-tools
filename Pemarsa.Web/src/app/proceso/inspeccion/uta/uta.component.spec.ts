import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UTAComponent } from './uta.component';

describe('UTAComponent', () => {
  let component: UTAComponent;
  let fixture: ComponentFixture<UTAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UTAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
