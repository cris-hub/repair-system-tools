import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { EntidadModel, ProcesoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-trabajo-realizado',
  templateUrl: './trabajo-realizado.component.html',
  styleUrls: ['./trabajo-realizado.component.css']
})
export class TrabajoRealizadoComponent implements OnInit, OnChanges {


  ngOnChanges(changes: SimpleChanges): void {
    this.requeridoformularioTrabajoRealizado = ''
    let value = changes.proceso.currentValue['EstadoId'];
    if (value == ESTADOS_PROCESOS.Asignado) {
      this.requeridoformularioTrabajoRealizado = 'requerido'
    }
    console.log(this.requeridoformularioTrabajoRealizado);
    this.ngOnInit()
  }
  //paramtros
  public parametros: EntidadModel[] = [];
  public parametrosInstructivo: EntidadModel[] = [];
  public parametrosEquipoUtilizado: EntidadModel[] = [];

  //paramtros

  //eventos
  @Output() formularioEvent = new EventEmitter();
  @Input() public proceso: ProcesoModel
  //eventos




  //formulario
  public formularioTrabajoRealizado: FormGroup
  //formulario

  //validaciones
  public requeridoformularioTrabajoRealizado = 'requerido';
  public disable = false;

  constructor(
    private paramtroService: ParametroService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.requeridoformularioTrabajoRealizado = ''
    let value = this.proceso['EstadoId'];
    if (value == ESTADOS_PROCESOS.Asignado) {
      this.requeridoformularioTrabajoRealizado = 'requerido'
    }
    this.consultarParametros();
    this.iniciarFormulario(this.proceso)
    this.validacionesFormulario();
  }

  iniciarFormulario(proceso: ProcesoModel) {
    this.formularioTrabajoRealizado = this.formBuilder.group({
      InstructivoId: [this.proceso.InstructivoId, Validators.required],
      EquipoMedicionUtilizadoId: [this.proceso.EquipoMedicionUtilizadoId, Validators.required],
      TrabajoRealizado: [this.proceso.TrabajoRealizado, Validators.required],
      EstadoId: [this.proceso.EstadoId],

    })
    this.formularioEvent.emit(this.formularioTrabajoRealizado);

    this.formularioTrabajoRealizado.valueChanges.subscribe(value => {
      console.log(value)
      this.formularioEvent.emit(this.formularioTrabajoRealizado);
      

    })
  }

  validacionesFormulario() {
    
    //funion
    if (this.proceso.Id) {
      if (this.proceso.EstadoId == ESTADOS_PROCESOS.Asignado) {
        
        this.formularioTrabajoRealizado.setValidators(Validators.required)
        this.formularioTrabajoRealizado.setErrors({ 'requerido': true })
        this.formularioTrabajoRealizado.get('EstadoId').setValue(ESTADOS_PROCESOS.Completado);
        
        
        this.disable = false;
      } else if ((this.proceso.EstadoId != ESTADOS_PROCESOS.Asignado)) {
        
        this.formularioTrabajoRealizado.setValidators(null)
        this.formularioTrabajoRealizado.setErrors(null)
        delete this.formularioTrabajoRealizado.controls['EstadoId']
        this.disable = true;
      }

    }
    

    this.formularioTrabajoRealizado.updateValueAndValidity();
  }

  consultarParametros() {
    this.paramtroService.consultarParametrosPorEntidad('MECANIZADO_TORNO').subscribe(response => {
      this.parametros = response.Consultas;
      this.parametrosInstructivo = this.parametros.filter(d => d.Grupo == 'INSTRUCTIVO_PROCESO');
      this.parametrosEquipoUtilizado = this.parametros.filter(d => d.Grupo == 'EQUIPO_MEDICION_UTILIZADO_PROCESO');

    })
  }

}
