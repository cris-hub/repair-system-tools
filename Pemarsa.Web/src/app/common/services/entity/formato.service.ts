import { Injectable } from "@angular/core";
import { FormatoModel } from "../../models/Index";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'FormatoES/'

  }

  public crearFormato(model: FormatoModel): Observable<boolean> {
    console.log(model)
    debugger
    return this.http.post<boolean>(this.urlServer + 'CrearFormato',
      model,
      { headers: this.header }
    );
  }
}
