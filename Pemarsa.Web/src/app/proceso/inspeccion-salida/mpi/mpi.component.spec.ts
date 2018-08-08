import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPIComponent } from './mpi.component';

describe('MPIComponent', () => {
  let component: MPIComponent;
  let fixture: ComponentFixture<MPIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
