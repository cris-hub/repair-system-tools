import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { ConfigService } from "../../config/config.service";
import { PaginacionModel, ListadoResponseModel } from "../../models/Index";
import { Observable } from "rxjs";

@Injectable()
export class SolicitudOrdenTrabajoService {
  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'OrdenTrabajoES/'
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

  private obj_to_query(obj) {
    var parts = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && (encodeURIComponent(obj[key]) != 'undefined')) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return "?" + parts.join('&');
  }
}