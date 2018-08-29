import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { EntidadModel, ProcesoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { ValidacionDirective } from '../../../common/directivas/validacion/validacion.directive';
import { ProcesoRealizarModel } from 'src/app/common/models/ProcesoRealizarModel';

@Component({
  selector: 'app-asignar-proceso',
  templateUrl: './asignar-proceso.component.html',
  styleUrls: ['./asignar-proceso.component.css']
})
export class AsignarProcesoComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {


    this.ngOnInit()
  }
  //paramtros
  public parametros: EntidadModel[] = [];
  public parametrosOperarios: EntidadModel[] = [];
  public parametrosMaquinas: EntidadModel[] = [];
  public parametrosNorma: EntidadModel[] = [];
  public parametrosProcesoRealizar: EntidadModel[] = [];
  public parametrosProcesoRealizarAdd: EntidadModel[] = [];
  //paramtros

  //eventos
  @Output() formularioEvent = new EventEmitter();
  @Output() procesosRealizar = new EventEmitter();
  @Input() public proceso: ProcesoModel
  @Input() public alistamiento;
  //eventos

  //formulario
  public formularioAsignacioTrabajo: FormGroup
  //formulario

  //validaciones
  public disable: boolean;

  public procesoRealizar: ProcesoRealizarModel[] = new Array<ProcesoRealizarModel>();

  constructor(
    private paramtroService: ParametroService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    let value = this.proceso['EstadoId'];
    this.consultarParametros();
    this.iniciarFormulario(this.proceso)
    this.validacionesFormulario();
  }

  iniciarFormulario(proceso: ProcesoModel) {

    if (this.proceso.ProcesoRealizar != undefined) {
      if (this.proceso.ProcesoRealizar.length > 0) {

        this.cargarMateriales(this.proceso.ProcesoRealizar);
      }
    }
    if (this.parametrosProcesoRealizarAdd.length > 0) {

      for (let material in this.parametrosProcesoRealizarAdd) {
        let nuevoProcesoRealizar: ProcesoRealizarModel = new ProcesoRealizarModel();
        nuevoProcesoRealizar.ProcesoId = (this.proceso != undefined ? proceso.Id : 0);
        nuevoProcesoRealizar.TipoProcesoId = this.parametrosProcesoRealizarAdd[material].Id;
        this.procesoRealizar.push(nuevoProcesoRealizar);
      }
      this.proceso.ProcesoRealizar = this.procesoRealizar;
    }

    this.formularioAsignacioTrabajo = this.formBuilder.group({
      MaquinaAsignadaId: [this.proceso.MaquinaAsignadaId],
      GuidOperario: [this.proceso.GuidOperario],
      NormaId: [this.proceso.NormaId],
      TrabajoRealizar: [this.proceso.TrabajoRealizar],
      EstadoId: [this.proceso.EstadoId],
      ProcesoRealizar: [this.proceso.ProcesoRealizar]
    })
    this.formularioEvent.emit(this.formularioAsignacioTrabajo);

    this.formularioAsignacioTrabajo.valueChanges.subscribe(value => {
      console.log(value)
      this.formularioEvent.emit(this.formularioAsignacioTrabajo);

    })
  }

  validacionesFormulario() {



    if (this.proceso.Id) {


      if (this.proceso.EstadoId == ESTADOS_PROCESOS.Pendiente) {
        this.formularioAsignacioTrabajo.setValidators(Validators.required)
        this.formularioAsignacioTrabajo.setErrors({ 'requerido': true })
        this.formularioAsignacioTrabajo.get('EstadoId').setValue(ESTADOS_PROCESOS.Asignado);


        this.disable = false;

      } else if (this.proceso.EstadoId != ESTADOS_PROCESOS.Pendiente) {
        this.formularioAsignacioTrabajo.setValidators(null)
        this.formularioAsignacioTrabajo.setErrors(null)

        delete this.formularioAsignacioTrabajo.controls['EstadoId']
        this.disable = true;

      }
    }


    this.formularioAsignacioTrabajo.updateValueAndValidity();
  }

  enviar() {
    if (!this.formularioAsignacioTrabajo.valid) {
      return
    }
  }

  consultarParametros() {
    this.paramtroService.consultarParametrosPorEntidad('MECANIZADO_TORNO').subscribe(response => {
      this.parametros = response.Consultas;
      this.parametrosOperarios = this.parametros.filter(d => d.Grupo == 'OPERARIO');
      this.parametrosMaquinas = this.parametros.filter(d => d.Grupo == 'MAQUINA_ASIGNADA_PROCESO');
      this.parametrosNorma = this.parametros.filter(d => d.Grupo == 'NORMA_PROCESO');
      this.parametrosProcesoRealizar = this.parametros.filter(d => d.Grupo == 'PROCESO_REALIZAR');
    })
  }

  agregarProcesoRealiza(event: any) {
    let idSeleccionado: any = event.target.value;
    if (idSeleccionado != "") {
      let nuevoItem: any = this.parametrosProcesoRealizar.find(c => c.Id == idSeleccionado);
      let index: any = this.parametrosProcesoRealizar.findIndex(c => c.Id == idSeleccionado);
      this.parametrosProcesoRealizarAdd.push(nuevoItem);
      this.parametrosProcesoRealizar.splice(index, 1);

      this.iniciarFormulario(this.proceso);
    }
  }
  eliminarProcesoRealizar(material: EntidadModel) {
    let index: any = this.parametrosProcesoRealizarAdd.findIndex(c => c.Id == material.Id);
    this.parametrosProcesoRealizar.push(material);
    this.parametrosProcesoRealizarAdd.splice(index, 1);

    this.procesosRealizar.emit(this.parametrosProcesoRealizarAdd);
  }

  cargarMateriales(procesoRealizar: any) {
    for (let procesos in procesoRealizar) {
      let objProceso: any = this.parametrosProcesoRealizar.find(e => e.Id == procesoRealizar[procesos].TipoProcesoId);
      let index: any = this.parametrosProcesoRealizar.findIndex(c => c.Id == procesoRealizar[procesos].TipoProcesoId);
      this.parametrosProcesoRealizarAdd.push(objProceso);
      this.parametrosProcesoRealizar.splice(index, 1);

    }
  }

}
