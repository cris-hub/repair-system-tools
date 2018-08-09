import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { PaginacionModel, ParametrosModel, SolicitudOrdenTrabajoModel, CatalogoModel } from '../../../common/models/Index';
import { ConfirmacionComponent } from '../../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { SolicitudOrdenTrabajoService } from '../../../common/services/entity/SolicitudOrdenTrabajo.service';
import { FiltroSolicitudOrdenTrabajoComponent } from '../index';

@Component({
  selector: 'app-listar-solicitudOrdenTrabajo',
  templateUrl: './listar-solicitudOrdenTrabajo.component.html',
  styleUrls: ['./listar-solicitudOrdenTrabajo.component.css']

})
export class ListarSolicitudOrdenTrabajoComponent implements OnInit {
  
  public  solicitudesOrdenTrabajos: SolicitudOrdenTrabajoModel[];
  public  solicitudOrdenTrabajoModelInput: SolicitudOrdenTrabajoModel;
  // paginacion
  public  accion: string[] ;
  public  paginacion: PaginacionModel;
  public  parametros: ParametrosModel;
  public  esFiltrar: boolean = false;

  public esNuevaAccion: boolean = false;
  constructor(
    public solicitudOrdenTrabajoSrv: SolicitudOrdenTrabajoService,
    public parametroSrv: ParametroService,
    private toastr: ToastrService,
     ) {
    
  }

  ngOnInit() {
    this.paginacion = new PaginacionModel(1, 30);

    this.consultarParametros();
    this.consultarSolicitudesDeTrabajo();
  }

  consultarSolicitudesDeTrabajo() {
    this.solicitudOrdenTrabajoSrv.consultarSolicitudesDeTrabajo(this.paginacion)
      .subscribe(response => {

        this.solicitudesOrdenTrabajos = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });

  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("SOLICITUD")
      .subscribe(response => {
        this.parametros = response;
      });
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.consultarSolicitudesDeTrabajo();
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.consultarSolicitudesDeTrabajo();
  }

  consultarOitPorFiltro(filtro) {
    filtro.PaginaActual = this.paginacion.PaginaActual;
    filtro.CantidadRegistros = this.paginacion.CantidadRegistros;
    this.solicitudOrdenTrabajoSrv.ConsultarSolicitudesDeTrabajoPorFiltro(filtro)
      .subscribe(response => {
        this.solicitudesOrdenTrabajos = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
  }

  habilitarNuevaOit() {
    this.solicitudOrdenTrabajoModelInput =null
    this.accion = ['Crear']
    this.esNuevaAccion = true;
  }


  ProcesarSolicitudOit(value) {
    this.solicitudOrdenTrabajoModelInput = value
    this.accion = ['Procesar', value]
    this.esNuevaAccion = true;
  }

  actualizarSolicitudOit(value) {
    this.solicitudOrdenTrabajoModelInput = value
    this.accion = ['Editar', value]
    this.esNuevaAccion = true;
  }

  verSolicitudOit(value) {
    this.solicitudOrdenTrabajoModelInput = value
    this.accion = ['Ver', value]
    this.esNuevaAccion = true;
  }

  accionRetorno(event) {
    console.log(event)

  }

  obtenerEstilosPorPrioridad(prioridad: string) {
    switch (prioridad) {
      case "Inmediato": return "Inmediato";
      case "Mediato": return "Mediato";
      case "Normal": return "Normal";
      case "Standby": return "Standby";
    }
  }

  persistenciaDatosResponse(evento) {
    if (evento) {
      this.toastr.info(this.accion[0]+'Ok');
      this.consultarSolicitudesDeTrabajo();
    }
    
  }
}
