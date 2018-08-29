import { Injectable } from "@angular/core";
import { FormatoModel, PaginacionModel, ListadoResponseModel, InspeccionConexionModel } from "../../models/Index";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ConfigService } from "../../config/config.service";

@Injectable()
export class FormatoService {



  private header: HttpHeaders;
  private urlServer: string;

  constructor(
    private http: HttpClient,
    private configSrv: ConfigService
  ) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'FormatoES/';

    
  }

  public crearFormato(model: FormatoModel): Observable<boolean> {
    debugger
    return this.http.post<boolean>(this.urlServer + 'CrearFormato',
      model,
      { headers: this.header }
    );
  }
  public consultarFormatos(paginacion: PaginacionModel): Observable<ListadoResponseModel> {
    return this.http.get<ListadoResponseModel>(
      this.urlServer + 'ConsultarFormatos',
      {
        headers: this.header,
        params: new HttpParams()
          .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
          .set('PaginaActual', paginacion.PaginaActual.toString())
      }
    );
  }

  public consultarFormatosPorFiltro(filtro: any): Observable<ListadoResponseModel> {
    var x = this.obj_to_query(filtro);
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarFormatosPorFiltro" + x,
      { headers: this.header });
  }
  public consultarFormatoPorGuid(guid: string): Observable<FormatoModel> {
    return this.http.get<FormatoModel>(this.urlServer + 'ConsultarFormatoPorGuid?guidFormato=' + guid);
  }
  public consultarFormatoPorInspeccionConexion(Inspeccion: InspeccionConexionModel): Observable<FormatoModel> {
    return this.http.get<FormatoModel>(this.urlServer + 'ConsultarFormatoPorInspeccionConexion/' + Inspeccion );
  }
  public actualizarFormato(model: FormatoModel): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarFormato',
      model,
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
