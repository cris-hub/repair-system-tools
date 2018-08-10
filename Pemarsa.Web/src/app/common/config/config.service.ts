import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { HttpModule, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Configuration } from './config.model';

@Injectable()
export class ConfigService {
  private config: Configuration;

  constructor(private http: HttpClient) {

  }

  async load(url: string){
     await this.http.get<Configuration>(url)
       .toPromise().
       then(conf => {
         this.config = conf;
       });

  }

  getConfiguration() {

  

    return this.config;
  }



}



