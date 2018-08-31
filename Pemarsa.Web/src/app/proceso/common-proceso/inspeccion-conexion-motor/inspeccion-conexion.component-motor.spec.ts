import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InspeccionConexionMotorComponent } from './inspeccion-conexion.component-motor';



describe('InspeccionConexionComponent', () => {
  let component: InspeccionConexionMotorComponent;
  let fixture: ComponentFixture<InspeccionConexionMotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspeccionConexionMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionConexionMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
