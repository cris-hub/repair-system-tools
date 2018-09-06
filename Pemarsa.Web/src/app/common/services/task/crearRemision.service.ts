import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { HttpModule, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from "../../config/config.service";
import { Observable } from "rxjs";
import { RemisionDTO } from "src/app/common/models/RemisionDTO";

@Injectable()
export class CrearRemisionService {
  private header: HttpHeaders;
  private urlServer: string;

  constructor(private http: HttpClient, private configSrv: ConfigService) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'CrearRemisionTS/';
  }

  public crearRemision(model: RemisionDTO): Observable<boolean> {
    return this.http.post<boolean>(this.urlServer + 'CrearRemision',
      model,
      { headers: this.header }
    );
  }

}
