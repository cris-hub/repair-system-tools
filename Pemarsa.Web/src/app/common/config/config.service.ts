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
    this.config = new Configuration("", "");
  }

  async load(url: string): Promise<any> {
    (await this.http.get<Configuration>(url)
      .subscribe(t => {
        this.config = t

      }))
    return Promise.resolve(this.config);

  }

  async getConfiguration(): Promise<Configuration> {
    //debugger
    //if (this.config == undefined) {
    //  this.http.get<Configuration>(url)
    //    .toPromise().;
    //  setTimeout(function () {
    //  }, 2000);
    //}
    let conf = await this.config;
    return Promise.resolve(conf);
  }



}



