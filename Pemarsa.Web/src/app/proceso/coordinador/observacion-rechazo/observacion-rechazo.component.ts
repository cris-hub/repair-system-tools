import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProcesoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { EntidadModel } from '../../../common/models/EntidadDTOModel';
import { ProcesoModel } from '../../../common/models/ProcesoModel';

@Component({
  selector: 'app-observacion-rechazo',
  templateUrl: './observacion-rechazo.component.html',
  styleUrls: ['./observacion-rechazo.component.css']
})
export class ObservacionRechazoComponent implements OnInit {
  @Output() confir = new EventEmitter();
  @Input() public data: ProcesoModel
  // proceso

  public titulo: String;
  public Mensaje: String;
  public Cancelar: Boolean;
  public tiposProcesos: EntidadModel[];
  private response: Boolean
  public procesoSiguiente: number;


  //open modal
  public abrilModal = false


  // formulario
  public formulario: FormGroup

  ngOnInit() {
    this.consultarProcesosSugerir();
    this.initFormulario();
  }

  constructor(
    private procesoService: ProcesoService,
    private parametrosService: ParametroService,
    private toasrService: ToastrService,
    private formBuilder: FormBuilder,

  ) { }

  initFormulario() {
    this.formulario = this.formBuilder.group({
      ObservacionRechazo: [this.data.ObservacionRechazo, Validators.required]
    });
  }
  cancelarAction() {
    this.response = false;
    this.confir.emit(this.response);
  }
  confirmarAction() {
    if (!this.formulario.valid) {
      return
    }
    this.rechazarProceso();
  }

  event(input) {
    if (input.innerHTML == 'rechazar') {
      this.data.EstadoId = ESTADOS_PROCESOS.Rechazado
      this.data.Reasignado = false
    } else {
      this.data.Reasignado = true
    }
    this.abrilModal = true

  }

  llenarObjectoData(titulo: string, Mensaje: string, Cancelar: boolean, objData: ProcesoModel) {
    this.titulo = titulo;
    this.Mensaje = Mensaje;
    this.Cancelar = Cancelar;
    this.data = objData;
    this.abrilModal = true

  }

  consultarProcesosSugerir() {
    this.parametrosService.consultarParametrosPorEntidad('PROCESO').subscribe(
      response => {
        this.tiposProcesos = response.Catalogos.filter(catalogo => {
          return catalogo.Grupo === 'TIPO_PROCESO'
        });
      }, error => {
        this.toasrService.error(error.message)
      }, () => {
      })
  }


  seleccionarSiguienteProceso(event) {
    this.procesoSiguiente = event;
    this.data.TipoProcesoSiguienteId = this.procesoSiguiente;


  }

  // formulario

  rechazarProceso() {
    this.procesoService.rechazarProceso(this.data.Guid, this.formulario.get('ObservacionRechazo').value)
      .subscribe(response => {
        response ? this.response = true : false
        this.confir.emit(this.response);
        console.log(this.response)

      }, errorResponse => {
        this.response = false;
        this.toasrService.error(errorResponse.message);
      }, () => {

      });
  }




}



