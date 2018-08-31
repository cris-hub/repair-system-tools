import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadTungstenoComponent } from './trazabilidad-tungsteno.component';

describe('TrazabilidadTungstenoComponent', () => {
  let component: TrazabilidadTungstenoComponent;
  let fixture: ComponentFixture<TrazabilidadTungstenoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazabilidadTungstenoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadTungstenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
