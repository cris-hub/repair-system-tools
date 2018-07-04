import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOitComponent } from './crear-oit.component';

describe('CrearOitComponent', () => {
  let component: CrearOitComponent;
  let fixture: ComponentFixture<CrearOitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearOitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
