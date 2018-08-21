import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProcesoModel, EntidadModel } from '../../common/models/Index';
import { FormGroup } from '@angular/forms';
import { ProcesoService } from '../../common/services/entity';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { TIPO_PROCESO, ESTADOS_PROCESOS } from '../../proceso/inspeccion-enum/inspeccion.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siguiente-proceso',
  templateUrl: './siguiente-proceso.component.html',
  styleUrls: ['./siguiente-proceso.component.css']
})
export class SiguienteProcesoComponent implements OnInit {
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
  }

  constructor(
    private procesoService: ProcesoService,
    private parametrosService: ParametroService,
    private toasrService: ToastrService,
    private router: Router,

  ) { }
  cancelarAction() {
    this.response = false;
    this.confir.emit(this.response);
  }
  confirmarAction() {
    this.crearProceso();


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

  crearProceso() {
    this.procesoService.crearProceso(this.data)
      .subscribe(response => {
        response ? this.response = true : false
        this.confir.emit(this.response);
        console.log(this.response)
        this.router.navigate(['/aprobacion-supervisor'])
      }, errorResponse => {
        this.response = false;
        this.toasrService.error(errorResponse.message);
      }, () => {

      });
  }




}



