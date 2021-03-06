import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ConfirmacionComponent } from '../../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { SolicitudOrdenTrabajoService } from '../../../common/services/entity/SolicitudOrdenTrabajo.service';
import { FiltroSolicitudOrdenTrabajoComponent } from '../index';
import { DatePipe } from '@angular/common';
import { SolicitudOrdenTrabajoModel } from '../../../common/models/SolicitudOrdenTrabajoModel';
import { PaginacionModel } from '../../../common/models/PaginacionModel';
import { ParametrosModel } from '../../../common/models/ParametrosModel';

@Component({
  selector: 'app-listar-solicitudOrdenTrabajo',
  templateUrl: './listar-solicitudOrdenTrabajo.component.html',
  styleUrls: ['./listar-solicitudOrdenTrabajo.component.css']

})
export class ListarSolicitudOrdenTrabajoComponent implements OnInit {

  public solicitudesOrdenTrabajos: SolicitudOrdenTrabajoModel[];
  public solicitudOrdenTrabajoModelInput: SolicitudOrdenTrabajoModel;
  // paginacion
  public accion: string[];
  public paginacion: PaginacionModel;
  public parametros: ParametrosModel;
  public esFiltrar: boolean = false;
  public filter: string;
  public esNuevaAccion: boolean = false;
  constructor(
    public solicitudOrdenTrabajoSrv: SolicitudOrdenTrabajoService,
    public parametroSrv: ParametroService,
    private toastr: ToastrService,
    private datePipe: DatePipe
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
        this.solicitudesOrdenTrabajos.forEach((sot) => {
          sot.ResponsableValor = sot.Responsable.Valor;
          sot.ClienteNickName = sot.Cliente.NickName;
          sot.ClienteLineaNombre = sot.ClienteLinea.Nombre;
          sot.PrioridadValor = sot.Prioridad.Valor;
          sot.EstadoValor = sot.Estado.Valor;
          sot.FechaRegistroVista = this.datePipe.transform(sot.FechaRegistro, "dd/MM/yyyy, h:mm a");
        });
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
        this.solicitudesOrdenTrabajos.forEach((sot) => {
          sot.ResponsableValor = sot.Responsable.Valor;
          sot.ClienteNickName = sot.Cliente.NickName;
          sot.ClienteLineaNombre = sot.ClienteLinea.Nombre;
          sot.PrioridadValor = sot.Prioridad.Valor;
          sot.EstadoValor = sot.Estado.Valor;
          sot.FechaRegistroVista = this.datePipe.transform(sot.FechaRegistro, "dd/MM/yyyy, h:mm a");
        });
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
  }

  habilitarNuevaOit() {
    this.solicitudOrdenTrabajoModelInput = null
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
      this.toastr.success('accion realizada correctamente')
      this.consultarSolicitudesDeTrabajo();
    } else {
      this.toastr.info('No se pudo realizar la accion, vuelve a intentarlo en otro momento')

    }

  }
}
