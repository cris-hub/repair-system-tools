import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ConfigService } from "../../config/config.service";
import { RemisionModel } from "src/app/common/models/RemisionModel";

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

  public crearRemision(model: RemisionModel): Observable<boolean> {
    return this.http.post<boolean>(this.urlServer + 'CrearRemision',
      model,
      { headers: this.header }
    );
  }
   

}
