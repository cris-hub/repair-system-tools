import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { ConfigService } from "../../config/config.service";
import { PaginacionModel, ListadoResponseModel, SolicitudOrdenTrabajoModel, AttachmentModel } from "../../models/Index";
import { Observable } from "rxjs";

@Injectable()
export class SolicitudOrdenTrabajoService {



  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    configSrv.getConfiguration().then(t => this.urlServer = t.webApiBaseUrl + 'OrdenTrabajoES/');

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

  public consultarDocumentoAdjuntoPorId(documentoAdjuntoId: number) {
    let url: string
    this.configSrv.getConfiguration().then(t => url = t.webApiBaseUrl);
    return this.http.get<AttachmentModel>(url + 'DocumentoAdjunto/' + "ConsultarDocumentoAdjunto?documentoAdjuntoId=" + documentoAdjuntoId,
      {
        headers: this.header
      });
  }

  public consultarSolicitudesDeTrabajo(paginacion: PaginacionModel): Observable<ListadoResponseModel> {

    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarSolicitudesDeTrabajo",
      {
        headers: this.header,
        params: new HttpParams()
          .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
          .set('PaginaActual', paginacion.PaginaActual.toString())
      });
  }

  public ConsultarSolicitudesDeTrabajoPorFiltro(filtro: any): Observable<ListadoResponseModel> {
    var x = this.obj_to_query(filtro);
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarSolicitudesDeTrabajoPorFiltro" + x,
      { headers: this.header });
  }

  public crearSolicitudOit(model: SolicitudOrdenTrabajoModel): Observable<Boolean> {
    return this.http.post<Boolean>(this.urlServer + 'CrearSolicitudDeTrabajo', model, { headers: this.header });
  }

  public ActualizarSolcitudDeTrabajo(model: SolicitudOrdenTrabajoModel): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarSolcitudDeTrabajo', model, { headers: this.header });
  }
  public consultarSolicitudDeTrabajoPorGuid(Guid: string): Observable<SolicitudOrdenTrabajoModel> {
    return this.http.get<SolicitudOrdenTrabajoModel>(this.urlServer + 'consultarSolicitudDeTrabajoPorGuid?guidSolicitudOrdenTrabajo=' + Guid, { headers: this.header });
  }

  public procesarSolitudOit(model: SolicitudOrdenTrabajoModel): Observable<Boolean> {
    return this.http.post<Boolean>(this.urlServer + 'CrearOrdenDeTrabajo', model, { headers: this.header });
  }

}


