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
    this.config = new Configuration("http://localhost:58906/api/", "");
  }

  load(url: string) {
    this.http.get<Configuration>(url)
      .toPromise().
      then(conf => {
        this.config = conf;
      });
  }

  getConfiguration() {
    //debugger
    //if (this.config == undefined) {
    //  this.http.get<Configuration>(url)
    //    .toPromise().;
    //  setTimeout(function () {
    //  }, 2000);
    //}
    return this.config;
  }
}
