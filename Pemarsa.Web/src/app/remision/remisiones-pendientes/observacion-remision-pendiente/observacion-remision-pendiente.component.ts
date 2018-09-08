import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RemisionService } from 'src/app/common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { RemisionPendienteDTO } from 'src/app/common/models/RemisionPendienteDTO';
import { ESTADOS_REMISION } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-observacion-remision-pendiente',
  templateUrl: './observacion-remision-pendiente.component.html',
  styleUrls: ['./observacion-remision-pendiente.component.css']
})
export class ObservacionRemisionPendienteComponent implements OnInit {

  @Output() Observacion = new EventEmitter();
  @Input() remision: RemisionPendienteDTO;


  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  public formulario: FormGroup;

  public Actualizo: boolean = false;

  ngOnInit() {
    this.initFormulario();
  }

  constructor(
    private remisionService: RemisionService,
    private toasrService: ToastrService,
    private formBuilder: FormBuilder,

  ) { }

  initFormulario() {
    this.formulario = this.formBuilder.group({
      Observacion: [, Validators.required]
    });
  }
  cancelarAction() {
    this.Actualizo = false;
    this.Observacion.emit(this.Actualizo);
  }
  confirmarAction() {
    if (!this.formulario.valid) {
      return
    }
    this.actualizarObservacion();
  }

  actualizarObservacion() {
    this.remisionService.actualizarObservacion(this.formulario.get('Observacion').value, this.remision.GuidRemision)
      .subscribe(response => {
        this.Actualizo = true;
      }, errorResponse => {

      }, () => {
        this.actualizarEstadoRemision();
      });
  }

  actualizarEstadoRemision() {
    this.remisionService.actualizarEstadoRemision(ESTADOS_REMISION.Anular, this.remision.GuidRemision)
      .subscribe(response => {
      }, errorResponse => {
      }, () => {
        this.Observacion.emit(this.Actualizo);
        this.toasrService.success("Se actualizo correctamente el estado de la remision.");
        document.getElementById("cerrar").click();
      });
  }


}
