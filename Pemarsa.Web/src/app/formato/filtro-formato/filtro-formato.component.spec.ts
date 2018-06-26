import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFormatoComponent } from './filtro-formato.component';

describe('FiltroFormatoComponent', () => {
  let component: FiltroFormatoComponent;
  let fixture: ComponentFixture<FiltroFormatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroFormatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
