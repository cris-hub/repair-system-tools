import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldaduraProcesarComponent } from './soldadura-procesar.component';

describe('SoldaduraProcesarComponent', () => {
  let component: SoldaduraProcesarComponent;
  let fixture: ComponentFixture<SoldaduraProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldaduraProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldaduraProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
