import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { ConfigService } from "../../config/config.service";
import { PaginacionModel, ListadoResponseModel, SolicitudOrdenTrabajoModel, AttachmentModel, OrdenTrabajoModel } from "../../models/Index";
import { Observable } from "rxjs";

@Injectable()
export class OrdenTrabajoService {



  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'OrdenTrabajoES/'
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
    return this.http.get<boolean>(this.urlServer + 'ActualizarEstadoOrdenDeTrabajo?guidSolicitudOrdenTrabajo=' + GuidOrdenDeTrabajo + '&estado=' + estado,
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

}


