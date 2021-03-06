import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { ConfigService } from "../../config/config.service";
import { PaginacionModel, ListadoResponseModel, SolicitudOrdenTrabajoModel, AttachmentModel, OrdenTrabajoModel, OrdenTrabajoHistorialProcesosModel } from "../../models/Index";
import { Observable } from "rxjs";

@Injectable()
export class OrdenTrabajoService {

  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'OrdenTrabajoES/';
  }

  private obj_to_query(obj) {
    var parts = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && (encodeURIComponent(obj[key]) != 'undefined')) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return "?" + parts.join('&');
  }

  public consultarOrdenesDeTrabajo(paginacion: PaginacionModel): Observable<ListadoResponseModel> {

    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarOrdenesDeTrabajo",
      {
        headers: this.header,
        params: new HttpParams()
          .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
          .set('PaginaActual', paginacion.PaginaActual.toString())
      });
  }

  public actualizarEstadoOrdenDeTrabajo(GuidOrdenDeTrabajo: any, estado: any): any {
    return this.http.post<boolean>(this.urlServer + 'ActualizarEstadoOrdenDeTrabajo?guidSolicitudOrdenTrabajo=' + GuidOrdenDeTrabajo + '&estado=' + estado,
      { headers: this.header });
  }

  public consultarOrdenDeTrabajoPorGuid(GuidOrdenDeTrabajo: any): Observable<OrdenTrabajoModel> {
    return this.http.get<OrdenTrabajoModel>(this.urlServer + 'ConsultarOrdenDeTrabajoPorGuid?GuidOrdenDeTrabajo=' + GuidOrdenDeTrabajo);
  }

  public crearOrdenDeTrabajo(ordenTrabajo: OrdenTrabajoModel): Observable<boolean> {
    return this.http.post<boolean>(this.urlServer + 'CrearOrdenDeTrabajo', ordenTrabajo, { headers: this.header });
  }

  public actualizarOrdenDeTrabajo(ordenTrabajo: OrdenTrabajoModel): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarOrdenDeTrabajo', ordenTrabajo, { headers: this.header });
  }

  public consultarOrdenesDeTrabajoPorFiltro(filtro: any): Observable<ListadoResponseModel> {
    var x = this.obj_to_query(filtro);
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarOrdenesDeTrabajoPorFiltro" + x,
      { headers: this.header });
  }

  public consultarHistorialModificacionesOrdenDeTrabajo(guidProceso: string, paginacion: PaginacionModel): Observable<ListadoResponseModel> {
    return this.http.get<ListadoResponseModel>(
      this.urlServer + 'ConsultarHistorialModificacionesOrdenDeTrabajo?guidProceso=' + guidProceso,
      {
        headers: this.header,
        params: new HttpParams()
          .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
          .set('PaginaActual', paginacion.PaginaActual.toString())
      });
  }

  public consultarHistorialProcesosDeOrdenDeTrabajo(guid: string): Observable<Array<OrdenTrabajoHistorialProcesosModel>> {
    return this.http.get<Array<OrdenTrabajoHistorialProcesosModel>>(this.urlServer + 'ConsultarHistorialProcesosDeOrdenDeTrabajo?guidOrdenTrabajo=' + guid, {
      headers: this.header
    });
  }

  public consultarOrdenDeTrabajoParaRemision(paginacion: PaginacionModel): Observable<ListadoResponseModel> {

    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarOrdenDeTrabajoParaRemision",
      {
        headers: this.header,
        params: new HttpParams()
          .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
          .set('PaginaActual', paginacion.PaginaActual.toString())
      });
  }

  public consultarOrdenDeTrabajoParaRemisionPorFiltro(filtro: any): Observable<ListadoResponseModel> {
    var x = this.obj_to_query(filtro);
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarOrdenDeTrabajoParaRemisionPorFiltro" + x,
      { headers: this.header });
  }

  public actualizarObservacionRemision(Observacion: any, guidOrdenDeTrabajo: any): any {
    return this.http.put<boolean>(this.urlServer + 'ActualizarObservacionRemision?Observacion=' + Observacion + '&guidOrdenTrabajo=' + guidOrdenDeTrabajo,
      { headers: this.header });
  }
}


