import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from "../../config/config.service";
import { PaginacionModel } from "../../models/PaginacionModel";
import { Observable } from "rxjs";
import { ListadoResponseModel } from "../../models/ListadoResponseModel";

@Injectable()
export class ClienteService {
  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
//    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'ClienteES/'
    this.urlServer = 'http://localhost:58906/api/ClienteES/'
    
  }

  public consultarClientes(paginacion: PaginacionModel): Observable<ListadoResponseModel>
  {
 
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarClientes",
      {
        headers: this.header,
        params: new HttpParams()
          .set('CantidadRegistros', paginacion.CantidadRegistros.toString())
          .set('PaginaActual', paginacion.PaginaActual.toString())
      });    
  }

  public ActualizarEstadoCliente(guidCliente: string, estado: string): Observable<boolean> {
    return this.http.get<boolean>(this.urlServer + 'ActualizarEstadoCliente?guidCliente=' + guidCliente + '&estado=' + estado,
      { headers: this.header });
  }

  public consultarClientesPorFiltro(filtro: any): Observable<ListadoResponseModel> {
    var x = this.obj_to_query(filtro);
    return this.http.get<ListadoResponseModel>(this.urlServer + "ConsultarClientesPorFiltro" + x,
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
