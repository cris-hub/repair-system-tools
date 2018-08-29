import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { EntidadModel, ProcesoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { ProcesoRealizarModel } from 'src/app/common/models/ProcesoRealizarModel';
import { EquipoMedicionComponent } from 'src/app/proceso/common-proceso/equipo-medicion/equipo-medicion.component';

@Component({
  selector: 'app-trabajo-realizado',
  templateUrl: './trabajo-realizado.component.html',
  styleUrls: ['./trabajo-realizado.component.css']
})
export class TrabajoRealizadoComponent implements OnInit, OnChanges {

  @ViewChild(EquipoMedicionComponent) public equipoMedicion: EquipoMedicionComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  
  //paramtros
  //public paramme:
  public parametros: EntidadModel[] = [];
  public parametrosInstructivo: EntidadModel[] = [];
  public parametrosEquipoUtilizado: EntidadModel[] = [];

  //paramtros

  //eventos
  @Output() formularioEvent = new EventEmitter();
  @Input() public proceso: ProcesoModel
  @Input() public procesosRealizar: ProcesoRealizarModel[]
  @Input() public alistamiento
  //eventos

  public valor = '';

  public formProcesoRealizar: any
  //formulario
  public formularioTrabajoRealizado: FormGroup
  public formularioEquipoMedicion: FormGroup
  //formulario

  //validaciones

  public procesoRealizar: ProcesoRealizarModel[] = new Array<ProcesoRealizarModel>();

  public disable: boolean;

  constructor(
    private paramtroService: ParametroService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.consultarParametros();
    this.iniciarFormulario(this.proceso)
    this.validacionesFormulario();
  }


  iniciarformularioEquipoMedicion(formularioEquipoMedicion: FormGroup) {
   
    this.formularioEquipoMedicion = formularioEquipoMedicion;

    var aplicaEquipo = this.formularioEquipoMedicion.value.AplicaEquipoMedicion;
    if (aplicaEquipo) {
      Object.assign(this.formularioTrabajoRealizado.value, this.formularioEquipoMedicion.value);
      Object.assign(this.proceso, this.formularioTrabajoRealizado.value);
      this.iniciarFormulario(this.proceso);
    } else {
      var equipo = this.formularioEquipoMedicion.value.ProcesoEquipoMedicion;
      var validar = Array.isArray(equipo);
      if (validar) {
        if (equipo.length > 0) {

          Object.assign(this.formularioTrabajoRealizado.value, this.formularioEquipoMedicion.value);
          Object.assign(this.proceso, this.formularioTrabajoRealizado.value);
          this.iniciarFormulario(this.proceso);
        }
      }
    }
  }


  iniciarFormulario(proceso: ProcesoModel) {
    this.formularioTrabajoRealizado = this.formBuilder.group({
      InstructivoId: [this.proceso.InstructivoId],
      TrabajoRealizado: [this.proceso.TrabajoRealizado],
      EstadoId: [this.proceso.EstadoId],
      AplicaEquipoMedicion: [this.proceso.AplicaEquipoMedicion],
      ProcesoEquipoMedicion: [this.proceso.ProcesoEquipoMedicion],
      ProcesoRealizar: this.formBuilder.array([])

    })
    if (this.proceso.ProcesoRealizar != undefined) {
      this.proceso.ProcesoRealizar = this.procesosRealizar;
      if(this.proceso.ProcesoRealizar != undefined){

      
      if (this.proceso.ProcesoRealizar.length > 0) {

        this.crearFormConexiones();
      }
      }
    }
    this.formularioEvent.emit(this.formularioTrabajoRealizado);

    this.formularioTrabajoRealizado.valueChanges.subscribe(value => {
      console.log(value)
      this.formularioEvent.emit(this.formularioTrabajoRealizado);


    })
  }


  crearFormConexiones(): any {

    if (!this.formularioTrabajoRealizado) {
      return
    }

    this.formProcesoRealizar = this.formularioTrabajoRealizado.get('ProcesoRealizar') as FormArray;

    if (this.proceso.ProcesoRealizar != undefined) {

      while (this.proceso.ProcesoRealizar.length < this.proceso.ProcesoRealizar.length) {
        this.proceso.ProcesoRealizar.push(new ProcesoRealizarModel())

      }



      this.proceso.ProcesoRealizar.forEach((p, i) => {
        let form = this.formBuilder.group({});
        form.addControl('ProcesoId', new FormControl(p.ProcesoId));
        form.addControl('TipoProcesoId', new FormControl(p.TipoProcesoId));
        form.addControl('Valor', new FormControl(p.Valor));
        this.valor = p.TipoProceso.Valor;
        this.formProcesoRealizar.push(form);

      })

    }
  }


  validacionesFormulario() {

    //funion
    this.disable = true;
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
      //this.parametrosEquipoUtilizado = this.parametros.filter(d => d.Grupo == 'EQUIPO_MEDICION_UTILIZADO_PROCESO');

    })
  }

}
