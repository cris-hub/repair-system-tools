import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProcesoModel, EntidadModel } from '../../../common/models/Index';
import { ProcesoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';

@Component({
  selector: 'app-inspeccion-conexion',
  templateUrl: './inspeccion-conexion.component.html',
  styleUrls: ['./inspeccion-conexion.component.css']
})
export class InspeccionConexionComponent implements OnInit {
  @Output() confir = new EventEmitter();
  @Input() public accion;
  @Input() public ocultar;
  // proceso
  @Input() public proceso: ProcesoModel;
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
    this.procesoService.actualizarProcesoSugerir(this.proceso.Guid, this.procesoSugerido)
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
