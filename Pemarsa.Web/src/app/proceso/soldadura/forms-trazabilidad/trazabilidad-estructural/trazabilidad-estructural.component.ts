import { Component, OnInit, SimpleChanges, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcesoModel, DetalleSoldaduraModel, ParametrosModel, CatalogoModel } from 'src/app/common/models/Index';
import { ESTADOS_PROCESOS } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-trazabilidad-estructural',
  templateUrl: './trazabilidad-estructural.component.html',
  styleUrls: ['./trazabilidad-estructural.component.css']
})
export class TrazabilidadEstructuralComponent implements OnInit {

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  @Output() formularioEvent = new EventEmitter();
  @Input() public proceso: ProcesoModel
  @Input() public detalle: DetalleSoldaduraModel
  @Input() public parametros: ParametrosModel

  public formularioTrazabilidadProceso: FormGroup
  public tipoSoldadura: CatalogoModel[] = new Array<CatalogoModel>();
  public modoAplicacion: CatalogoModel[] = new Array<CatalogoModel>();


  public disable: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.validacionesFormulario();
    this.consultarParametros();
  }

  iniciarFormulario() {
    this.formularioTrazabilidadProceso = this.formBuilder.group({
      TipoSoldaduraId: [this.detalle ? this.detalle.TipoSoldaduraId : null],
      CantidadSoldadura: [this.detalle ? this.detalle.CantidadSoldadura : null],
      ModoAplicacionId: [this.detalle ? this.detalle.ModoAplicacionId : null],
      Lote: [this.detalle ? this.detalle.Lote : null],
      Amperaje: [this.detalle ? this.detalle.Amperaje : null],
      Voltaje: [this.detalle ? this.detalle.Voltaje : null]
    })

    this.formularioEvent.emit(this.formularioTrazabilidadProceso);

    this.formularioTrazabilidadProceso.valueChanges.subscribe(value => {
      console.log(value)
      this.formularioEvent.emit(this.formularioTrazabilidadProceso);

    })
  }

  consultarParametros() {
    if (this.parametros) {
      if (this.parametros.Catalogos.length > 0) {
        this.tipoSoldadura = this.parametros.Catalogos.filter(e => e.Grupo == "SOLDADURA_TIPO_SOLDADURA");
        this.modoAplicacion = this.parametros.Catalogos.filter(e => e.Grupo == "SOLDADURA_MODO_APLICACION");
      }
    }
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
