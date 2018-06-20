import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from "../../config/config.service";
import { PaginacionModel } from "../../models/PaginacionModel";
import { Observable } from "rxjs";
import { ListadoResponseModel } from "../../models/ListadoResponseModel";
import { ClienteModel } from "../../models/Index";

@Injectable()
export class ClienteService {
  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'ClienteES/'
  }

  public crearCliente(model: ClienteModel): Observable<boolean> {
    return this.http.post<boolean>(this.urlServer + 'CrearCliente',
      model,
      { headers: this.header }
    );
  }

  public actualizarCliente(model: ClienteModel): Observable<boolean> {
    return this.http.put<boolean>(this.urlServer + 'ActualizarCliente',
      model,
      { headers: this.header });
  }

  public consultarClientePorGuid(guidCliente: string): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(this.urlServer + 'ConsultarClientePorGuid?guidCliente=' +
      guidCliente,
      { headers: this.header });
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
