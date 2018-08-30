import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldaduraListarComponent } from './soldadura-listar.component';

describe('SoldaduraListarComponent', () => {
  let component: SoldaduraListarComponent;
  let fixture: ComponentFixture<SoldaduraListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldaduraListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldaduraListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
