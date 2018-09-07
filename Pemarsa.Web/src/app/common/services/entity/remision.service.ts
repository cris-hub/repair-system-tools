import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ConfigService } from "../../config/config.service";
import { RemisionModel } from "src/app/common/models/RemisionModel";
import { PaginacionModel } from "src/app/common/models/PaginacionModel";
import { ListadoResponseModel } from "src/app/common/models/Index";

@Injectable()
export class RemisionService {



  private header: HttpHeaders;
  private urlServer: string;

  constructor(
    private http: HttpClient,
    private configSrv: ConfigService
  ) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'RemisionES/';
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

  public crearRemision(model: RemisionModel): Observable<boolean> {
    return this.http.post<boolean>(this.urlServer + 'CrearRemision',
      model,
      { headers: this.header }
    );
  }
  public consultarRemisionesPendientes(paginacion: PaginacionModel): Observable<ListadoResponseModel> {
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarRemisionesPendientes",
      {
        headers: this.header,
        params: new HttpParams()
          .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
          .set('PaginaActual', paginacion.PaginaActual.toString())
      });
  }

  public consultarRemisionesPendientesPorFiltro(filtro: any): Observable<ListadoResponseModel> {
    var x = this.obj_to_query(filtro);
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarRemisionesPendientesPorFiltro" + x,
      { headers: this.header });
  }

  public actualizarObservacion(Observacion: any, guidRemision: any): any {
    return this.http.put<boolean>(this.urlServer + 'ActualizarObservacion?Observacion=' + Observacion + '&guidRemision=' + guidRemision,
      { headers: this.header });
  }

  public actualizarEstadoRemision(estado: any, guidRemision: any): any {
    return this.http.put<boolean>(this.urlServer + 'ActualizarEstadoRemision?estado=' + estado + '&guidRemision=' + guidRemision,
      { headers: this.header });
  }

}
