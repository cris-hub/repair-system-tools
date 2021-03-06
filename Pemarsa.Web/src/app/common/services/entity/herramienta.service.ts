import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from "../../config/config.service";
import { PaginacionModel } from "../../models/PaginacionModel";
import { Observable } from "rxjs";
import { ListadoResponseModel } from "../../models/ListadoResponseModel";
import { HerramientaModel } from "../../models/Index";
@Injectable()
export class HerramientaService {
  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'HerramientaES/';

    
  }

  public CrearHerramienta(model: HerramientaModel): Observable<boolean> {
    console.log(model);
    return this.http.post<boolean>(this.urlServer + 'CrearHerramienta',
      model,
      { headers: this.header }
    );
  }

  public ConsultarHerramientas(paginacion: PaginacionModel): Observable<ListadoResponseModel> {
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarHerramientas",
      {
        headers: this.header,
        params: new HttpParams()
          .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
          .set('PaginaActual', paginacion.PaginaActual.toString())
      });
  }

  public ConsultarHerramientasPorFiltro(filtro: any): Observable<ListadoResponseModel> {
    var x = this.obj_to_query(filtro);
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarHerramientasPorFiltro" + x,
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

  public ConsultarHerramientaPorGuid(guidHerramienta: string): Observable<HerramientaModel> {
    return this.http.get<HerramientaModel>(this.urlServer + 'ConsultarHerramientaPorGuid?guidHerramienta=' +
      guidHerramienta,
      { headers: this.header });
  }

  public actualizarHerramienta(model: HerramientaModel): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarHerramienta',
      model,
      { headers: this.header });
  }
}
