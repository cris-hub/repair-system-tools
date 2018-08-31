import { Component, OnInit, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import { ProcesoModel } from 'src/app/common/models/Index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ESTADOS_PROCESOS } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';
import { DetalleSoldaduraModel } from 'src/app/common/models/DetalleSoldaduraModel';

@Component({
  selector: 'app-trazabilidad-proceso',
  templateUrl: './trazabilidad-proceso.component.html',
  styleUrls: ['./trazabilidad-proceso.component.css']
})
export class TrazabilidadProcesoComponent implements OnInit {

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  @Output() formularioEvent = new EventEmitter();
  @Input() public proceso: ProcesoModel
  @Input() public detalle: DetalleSoldaduraModel

  public formularioTrazabilidadProceso: FormGroup


  public disable: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.validacionesFormulario();
  }

  iniciarFormulario() {
    this.formularioTrazabilidadProceso = this.formBuilder.group({
      TiempoPrecalentamiento: [this.detalle ? this.detalle.TiempoPrecalentamiento : null],
      TemperaturaPrecalentamiento: [this.detalle ? this.detalle.TemperaturaPrecalentamiento : null],
      TipoSoldaduraId: [this.detalle ? this.detalle.TipoSoldaduraId : null],
      CantidadSoldadura: [this.detalle ? this.detalle.CantidadSoldadura : null],
      TiempoAplicacion: [this.detalle ? this.detalle.TiempoAplicacion : null],
      Lote: [this.detalle ? this.detalle.Lote : null],
      Voltaje: [this.detalle ? this.detalle.Voltaje : null],
      Amperaje: [this.detalle ? this.detalle.Amperaje : null]
    })

    this.formularioEvent.emit(this.formularioTrazabilidadProceso);

    this.formularioTrazabilidadProceso.valueChanges.subscribe(value => {
      console.log(value)
      this.formularioEvent.emit(this.formularioTrazabilidadProceso);

    })
  }


  validacionesFormulario() {

    //funion
    this.disable = true;
    if (this.proceso.Id) {
      if (this.proceso.EstadoId == ESTADOS_PROCESOS.Asignado) {

        this.formularioTrazabilidadProceso.setValidators(Validators.required)
        this.formularioTrazabilidadProceso.setErrors({ 'requerido': true })
        this.disable = false;


      } else if ((this.proceso.EstadoId != ESTADOS_PROCESOS.Asignado)) {

        this.formularioTrazabilidadProceso.setValidators(null)
        this.formularioTrazabilidadProceso.setErrors(null)
        this.disable = true;
      }

    }


    this.formularioTrazabilidadProceso.updateValueAndValidity();
  }

}
