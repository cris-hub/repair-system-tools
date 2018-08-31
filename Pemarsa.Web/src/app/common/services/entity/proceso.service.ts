import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from "../../config/config.service";
import { PaginacionModel } from "../../models/PaginacionModel";
import { Observable } from "rxjs";
import { ListadoResponseModel } from "../../models/ListadoResponseModel";
import { CatalogoModel, ProcesoModel, InspeccionModel, DetalleSoldaduraModel } from "../../models/Index";

@Injectable()
export class ProcesoService {


  
  public crearProceso(proceso: ProcesoModel): Observable<string> {
    return this.http.post<string>(this.urlServer + 'CrearProceso', proceso, {
      headers: this.header
    });
  }
  public iniciarProcesar: Boolean = false;

  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'ProcesoES/';

    
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
  public consultarProcesoPorTipoYOrdenTrabajo(tipoProceso: number, guidOrdenTrabajo: string): Observable<ProcesoModel> {
    return this.http.get<ProcesoModel>(this.urlServer + 'ConsultarProcesoPorTipoYOrdenTrabajo?tipoProceso=' + tipoProceso + '&guidOit=' + guidOrdenTrabajo, {
      headers: this.header
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
      this.urlServer + 'ActualizarInspeccion', inspeccion, { headers: this.header }
    )
  }

  public actualizarProceso(model: ProcesoModel): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarProceso', model, {headers:this.header});
  }

  public actualizarInspeccionConexiones(model): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarInspeccionConexiones', model, { headers: this.header });
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
  public rechazarProceso(guiidProceso: string, observacion: string): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'RechazarProceso?guiidProceso=' + guiidProceso + '&observacion=' + observacion, {
      headers: this.header
    });
  }


  public actualizarEstadoInspeccionPieza(guidProceso: string, pieza: string, estado: number): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarEstadoInspeccionPieza?guidProceso=' + guidProceso + '&pieza=' + pieza + '&estado=' + estado, {
      headers: this.header
    });
  }

  public consultarSiguienteInspeccion(guidProceso: string, pieza: string): Observable<InspeccionModel> {
    return this.http.get<InspeccionModel>(this.urlServer + 'ConsultarSiguienteInspeccion?guidProceso=' + guidProceso + '&pieza=' + pieza, {
      headers: this.header
    });
  }

  public consultarProcesosPorTipoPorFiltro(filtro: any): Observable<ListadoResponseModel> {
    var x = this.obj_to_query(filtro);
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarProcesosPorTipoPorFiltro" + x,
      { headers: this.header });
  }
  public crearDetalleSoldadura(detalleSoldadura: DetalleSoldaduraModel): Observable<string> {
    return this.http.post<string>(this.urlServer + 'CrearDetalleSoldadura', detalleSoldadura, {
      headers: this.header
    });
  }

  public consultarDetalleSoldaduraPorGuid(guidDetalleSoldadura: string): Observable<DetalleSoldaduraModel> {
    return this.http.get<DetalleSoldaduraModel>(this.urlServer + 'ConsultarDetalleSoldaduraPorGuid?guidDetalleSoldadura=' + guidDetalleSoldadura, {
      headers: this.header
    });
  }
}
