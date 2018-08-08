import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UTComponent } from './ut.component';

describe('UtComponent', () => {
  let component: UTComponent;
  let fixture: ComponentFixture<UTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
