import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionOitComponent } from './informacion-oit.component';

describe('InformacionOitComponent', () => {
  let component: InformacionOitComponent;
  let fixture: ComponentFixture<InformacionOitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionOitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionOitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
