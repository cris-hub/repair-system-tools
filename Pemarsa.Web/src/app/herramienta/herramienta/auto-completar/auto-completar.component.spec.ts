import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompletarComponent } from './auto-completar.component';

describe('AutoCompletarComponent', () => {
  let component: AutoCompletarComponent;
  let fixture: ComponentFixture<AutoCompletarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompletarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
