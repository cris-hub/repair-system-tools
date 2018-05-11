import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpModule, RequestOptions } from '@angular/http';

import { ParametrosModel } from '../../models/ParametrosModel';
import { Promise } from 'q';
import { EntidadModel } from '../../models/EntidadDTOModel';
import { ConfigService } from '../../config/config.service'
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class ParametroService {
  private header : HttpHeaders;
  private urlServer: string;
  constructor(private http: HttpClient, private configSrv: ConfigService) {
    //this.urlServer = configSrv.getConfiguration().webApiBaseUrl + 'ParametroUS/';
    this.urlServer = 'http://localhost:58906/api/ParametroUS/'
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    
  }

  public consultarParametrosPorEntidad(entidad: string): Observable<ParametrosModel> {
    return this.http.get<ParametrosModel>(this.urlServer + 'ConsultarParametrosPorEntidad?entidad=' + entidad,
      {            
        headers: this.header        
      });        
  }
}
