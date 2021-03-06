
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { EntidadModel } from '../../../common/models/EntidadDTOModel';
import { ProcesoModel } from '../../../common/models/ProcesoModel';
import { ProcesoService } from '../../../common/services/entity/proceso.service';

@Component({
  selector: 'app-sugerir-proceso',
  templateUrl: './sugerir-proceso.component.html',
  styleUrls: ['./sugerir-proceso.component.css']
})
export class SugerirProcesoComponent implements OnInit {
  @Output() confir = new EventEmitter();
  @Input() public accion;
  @Input() public ocultar;
  // proceso
  public data: ProcesoModel;
  public titulo: String;
  public Mensaje: String;
  public Cancelar: Boolean;
  public tiposProcesos: EntidadModel[];
  private response: Boolean
  public procesoSugerido: string;

  // formulario
  public formulario: FormGroup

  ngOnInit() {
    this.consultarProcesosSugerir();
  }

  constructor(
    private procesoService: ProcesoService,
    private parametrosService: ParametroService,
    private toasrService: ToastrService,

  ) { }
  cancelarAction() {
    this.response = false;
    this.confir.emit(this.response);
  }
  confirmarAction() {
    this.actualizarProcesoASugerir();


  }

  llenarObjectoData(titulo: string, Mensaje: string, Cancelar: boolean, objData: ProcesoModel) {
    this.titulo = titulo;
    this.Mensaje = Mensaje;
    this.Cancelar = Cancelar;
    this.data = objData;
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


  seleccionarProcesoSugerir(event) {
    this.procesoSugerido = event;
  }

  // formulario

  actualizarProcesoASugerir() {
    this.procesoService.actualizarProcesoSugerir(this.data.Guid, this.procesoSugerido)
      .subscribe(response => {
        this.response = response
        this.confir.emit(this.response);
        console.log(this.response)

      }, errorResponse => {
        this.response = false;
        this.toasrService.error(errorResponse.message);
      }, () => {

      });
  }




}



