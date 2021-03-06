import { Component, OnInit, ViewChild } from '@angular/core';
import { SiguienteProcesoComponent } from '../../coordinador/siguiente-proceso/siguiente-proceso.component';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { Location } from '@angular/common';
import { ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE, ESTADOS_PROCESOS, TIPO_PROCESO, CONEXION } from '../../inspeccion-enum/inspeccion.enum';
import { Response } from '@angular/http';
import { SugerirProcesoComponent } from '../../coordinador/sugerir-proceso/sugerir-proceso.component';
import { ProcesoModel } from '../../../common/models/ProcesoModel';
import { InspeccionConexionModel } from '../../../common/models/InspeccionConexionModel';
import { InspeccionConexionFormatoModel } from '../../../common/models/InspeccionConexionFormatoModel';

@Component({
  selector: 'app-procesar-inspeccion',
  templateUrl: './procesar-inspeccion.component.html',
  styleUrls: ['./procesar-inspeccion.component.css']
})
export class ProcesarInspeccionComponent implements OnInit {
  @ViewChild(SugerirProcesoComponent) public sugerir: SugerirProcesoComponent;


  //proceso
  public proceso: ProcesoModel = new ProcesoModel();

  public conexiones: InspeccionConexionModel[] = new Array<InspeccionConexionModel>()
  public conexion: InspeccionConexionModel = new InspeccionConexionModel()
  //formulario
  public formularioAsignacion: FormGroup
  public formularioTrabajoRealizado: FormGroup
  public esFormularioValido: Boolean = false;

  //accion
  public accion: string;

  constructor(
    private location: Location,
    private procesoService: ProcesoService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit() {
    this.consultarProceso();

  }


  //consultas
  consultarProceso() {
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response;
        this.accionRealizar(this.proceso.EstadoId)
        this.proceso.InspeccionConexionFormato = response.InspeccionConexionFormato ? response.InspeccionConexionFormato : new InspeccionConexionFormatoModel();
        this.conexion.InspeccionConexionFormato = this.proceso.InspeccionConexionFormato ;
        this.conexiones.push(this.conexion);
      }, error => {

      }, () => {
        this.loaderService.display(false)
      });
  }



  //parametrosUri
  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    return parametrosUlrMap;
  }

  //iniciar formulario
  iniciarformularioAsignacion(formularioAsignacion: FormGroup) {
    this.formularioAsignacion = formularioAsignacion;
  }
  iniciarformularioTrabajoRealizado(formularioTrabajoRealizado: FormGroup) {
    this.formularioTrabajoRealizado = formularioTrabajoRealizado;
  }

  //accionRealizar
  accionRealizar(estadoId: number) {
    switch (estadoId) {
      case ESTADOS_PROCESOS.Pendiente:
        this.accion = 'Asignar'
        break;
      case ESTADOS_PROCESOS.Asignado:
        this.accion = 'Completar'
        break;
      case ESTADOS_PROCESOS.Completado:
        this.accion = 'Liberar'
        break;
      default:
    }
  }

  //inspeccionConexionCompoenteResponse
  asignarValoresConexion(InspeccionConexionFormatoModel: InspeccionConexionFormatoModel) {

  
    Object.assign(this.proceso.InspeccionConexionFormato, InspeccionConexionFormatoModel);
    
  }

  //procesar
  procesar() {
    this.conexionesValidas();

    this.actualizarDatos();

  }

  conexionesValidas() {
    if (!this.proceso.InspeccionConexionFormato) {
      this.toastrService.error('Falta alguna inspeccion por diligenciar')
      return
    }
  }

  //persistir
  actualizarDatos() {

    this.loaderService.display(true)

    

    this.procesoService.actualizarProceso(this.proceso).subscribe(
      response => {
        response ?
          this.toastrService.success(ALERTAS_OK_MENSAJE.InspeccionActualizada) :
          this.toastrService.error(ALERTAS_ERROR_MENSAJE.InspeccionERRORactualizar);
        this.location.back();
      }, error => {
        this.toastrService.error(error);
        this.loaderService.display(false)

      }, () => {
        this.loaderService.display(false)

      })
  }

  responseSugerenciaProceso(event) {
    if (event) {
      this.procesar();

      this.procesoService.actualizarEstadoProceso(this.proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
        if (response == true) {
          this.router.navigate(['/mecanizado/torno']);
        };
      });

    }
  }

  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.sugerir.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }

}
