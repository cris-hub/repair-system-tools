import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from "../../config/config.service";
import { PaginacionModel } from "../../models/PaginacionModel";
import { Observable } from "rxjs";
import { ListadoResponseModel } from "../../models/ListadoResponseModel";
import { CatalogoModel, ProcesoModel } from "../../models/Index";

@Injectable()
export class ProcesoService {


  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'ProcesoES/'
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

  public consultarProcesosPorTipo(tipoProcesoActual: CatalogoModel, paginacion: PaginacionModel): Observable<ListadoResponseModel> {
    return this.http.get<ListadoResponseModel>(this.urlServer + 'ConsultarProcesosPorTipo?tipoProceso=' + tipoProcesoActual.Id, {
      headers: this.header,
      params: new HttpParams()
        .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
        .set('PaginaActual', paginacion.PaginaActual.toString())

    });
  }

  public consultarProcesoPorGuid(guidProceso: string): Observable<ProcesoModel> {
    return this.http.get<ProcesoModel>(this.urlServer + 'consultarProcesoPorGuid?guidProceso=' + guidProceso, {
      headers: this.header
    });
  }

}
