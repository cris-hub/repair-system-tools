import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from "../../config/config.service";
import { PaginacionModel } from "../../models/PaginacionModel";
import { Observable } from "rxjs";
import { ListadoResponseModel } from "../../models/ListadoResponseModel";
import { CatalogoModel, ProcesoModel, InspeccionModel } from "../../models/Index";

@Injectable()
export class ProcesoService {


  public iniciarProcesar :Boolean= false;

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

  public crearInspeccion(guidProceso: string, tipoInspeccion: number, pieza): Observable<string> {
    return this.http.post<string>(this.urlServer + 'CrearInspeccion?guidProceso=' + guidProceso + '&tipoInspeccion=' + tipoInspeccion + '&pieza=' + pieza, {
      headers: this.header
    });
  }

  public actualizarEstadoInspeccion(guidInspeccion: string, estado: number): Observable<string> {
    return this.http.put<string>(this.urlServer + 'ActualizarEstadoInspeccion?guidInspeccion=' + guidInspeccion + '&estado=' + estado, {
      headers: this.header
    });
  }

  public actualizarInspección(inspeccion: InspeccionModel): Observable<boolean> {
    return this.http.put<boolean>(
      this.urlServer + 'ActualizarInspección', inspeccion, { headers: this.header }
    )
  }

  public actualizarProcesoSugerir(guiidProceso: string, guidProcesoSugerir: string): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarProcesoSugerir?guiidProceso=' + guiidProceso + '&guidProcesoSugerir=' + guidProcesoSugerir, {
      headers: this.header
    });
  }

  public actualizarEstadoProceso(guidProceso: any, estado: any): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarEstadoProceso?guidProceso=' + guidProceso + '&estado=' + estado, {
      headers: this.header
    });
  }


  public actualizarEstadoInspeccionPieza(guidProceso: string, pieza : string ,estado: number): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarEstadoInspeccionPieza?guidProceso=' + guidProceso + '&pieza=' + pieza + '&estado=' + estado, {
      headers: this.header
    });
  }

  public consultarSiguienteInspeccion(guidProceso: string,pieza:string): Observable<InspeccionModel> {
    return this.http.get<InspeccionModel>(this.urlServer + 'ConsultarSiguienteInspeccion?guidProceso=' + guidProceso + '&pieza=' + pieza , {
      headers: this.header
    });
  }
}
