import { Component, OnInit, ViewChild } from '@angular/core';
import { SiguienteProcesoComponent } from '../../coordinador/siguiente-proceso/siguiente-proceso.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { Location } from '@angular/common';
import { ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE, ESTADOS_PROCESOS, TIPO_PROCESO, CONEXION } from '../../inspeccion-enum/inspeccion.enum';
import { Response } from '@angular/http';
import { SugerirProcesoComponent } from '../../coordinador/sugerir-proceso/sugerir-proceso.component';
import {  ProcesoModel } from '../../../common/models/Index';
import { ProcesoService } from '../../../common/services/entity/proceso.service';
import { InspeccionConexionModel } from '../../../common/models/InspeccionConexionModel';

@Component({
  selector: 'app-procesar-inspeccion-dimensional',
  templateUrl: './procesar-inspeccion-dimensional.component.html',
  styleUrls: ['./procesar-inspeccion-dimensional.component.css']
})
export class ProcesarInspeccionDimensionalComponent implements OnInit {
  @ViewChild(SugerirProcesoComponent) public sugerir: SugerirProcesoComponent;


  //proceso
  public proceso: ProcesoModel = new ProcesoModel();
  public procesoInspeccionEntrada: ProcesoModel = new ProcesoModel();
  public conexiones: InspeccionConexionModel[] = new Array<InspeccionConexionModel>()
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
        this.consultarInspeccionEntradaOrdenTrabajo(TIPO_PROCESO.INSPECCIONENTRADA, this.proceso.OrdenTrabajo.Guid);
        
      }, error => {

      }, () => {
        this.loaderService.display(false)
      });
  }

  consultarInspeccionEntradaOrdenTrabajo(tipoProceso: number, ordenTrabajo: string) {
    this.procesoService.consultarProcesoPorTipoYOrdenTrabajo(tipoProceso, ordenTrabajo).subscribe(response => {
      this.procesoInspeccionEntrada = response;
      this.procesoInspeccionEntrada.ProcesoInspeccion.forEach(d => { this.conexiones = d.Inspeccion.Conexiones });
      
    })
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
  asignarValoresConexion(conexion: InspeccionConexionModel) {
    Object.assign(this.conexiones.find(c => c.Id == conexion.Id), conexion);
  }

  //procesar
  procesar() {
    this.conexionesValidas();
 
    this.actualizarDatos();

  }

  conexionesValidas() {
    if (!this.conexiones.filter(t => t.ConexionId != CONEXION.NOAPLICA).every(t => t.InspeccionConexionFormato.EstaConforme)) {
      this.toastrService.error('Falta alguna inspeccion por diligenciar')
      return
    }
  }

  //persistir
  actualizarDatos() {

    this.loaderService.display(true)
    
    this.procesoService.actualizarInspeccionConexiones(this.conexiones).subscribe(
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
      this.procesar()
      this.procesoService.actualizarEstadoProceso(this.proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
        if (response == true) {
          this.router.navigate(['mecanizado/torno']);

        };
      });

    }
  }

  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.sugerir.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }

}
