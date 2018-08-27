import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { EntidadModel, ProcesoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-asignar-proceso',
  templateUrl: './asignar-proceso.component.html',
  styleUrls: ['./asignar-proceso.component.css']
})
export class AsignarProcesoComponent implements OnInit, OnChanges {


  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    this.ngOnInit()
  }
  //paramtros
  public parametros: EntidadModel[] = [];
  public parametrosOperarios: EntidadModel[] = [];
  public parametrosMaquinas: EntidadModel[] = [];
  public parametrosNorma: EntidadModel[] = [];
  //paramtros

  //eventos
  @Output() formularioEvent = new EventEmitter();
  @Input() public proceso: ProcesoModel
  //eventos

  //formulario
  public formularioAsignacioTrabajo: FormGroup
  //formulario

  //validaciones
  public requerido = 'requerido';
  public disable = false;

  constructor(
    private paramtroService: ParametroService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.consultarParametros();
    this.iniciarFormulario(this.proceso)
    this.validacionesFormulario();
  }

  iniciarFormulario(proceso: ProcesoModel) {
    this.formularioAsignacioTrabajo = this.formBuilder.group({
      MaquinaAsignadaId: [this.proceso.MaquinaAsignadaId, Validators.required],
      GuidOperario: [this.proceso.GuidOperario, Validators.required],
      NormaId: [this.proceso.NormaId, Validators.required],
      TrabajoRealizar: [this.proceso.TrabajoRealizar, Validators.required],
      EstadoId: [this.proceso.EstadoId],
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
        this.requerido = 'requerido'
        
        this.disable = false;

      } else if (this.proceso.EstadoId != ESTADOS_PROCESOS.Pendiente) {
        this.formularioAsignacioTrabajo.setValidators(null)
        this.formularioAsignacioTrabajo.setErrors(null)
        this.requerido = '';
        
        this.disable = true;

      }
    }


    this.formularioAsignacioTrabajo.updateValueAndValidity();
  }

  consultarParametros() {
    this.paramtroService.consultarParametrosPorEntidad('MECANIZADO_TORNO').subscribe(response => {
      this.parametros = response.Consultas;
      this.parametrosOperarios = this.parametros.filter(d => d.Grupo == 'OPERARIO');
      this.parametrosMaquinas = this.parametros.filter(d => d.Grupo == 'MAQUINA_ASIGNADA_PROCESO');
      this.parametrosNorma = this.parametros.filter(d => d.Grupo == 'NORMA_PROCESO');
    })
  }

}
