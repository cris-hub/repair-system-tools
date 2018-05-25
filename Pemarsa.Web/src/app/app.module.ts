import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { RouterConfigLoader } from '@angular/router/src/router_config_loader';
import { ConfigLoader } from './common/config/config.loader';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './common/components/home/home.component';

import { ClienteModule } from './cliente/cliente.module';
import { ClienteService, HerramientaService, SolicitudOrdenTrabajoService } from './common/services/entity';
import { HerramientaModule } from './herramienta/herramienta.module';
import { ConfigService } from './common/config/config.service';
import { UtilModule } from './common/modules/util.module';
import { ParametroService } from './common/services/entity/parametro.service';
import { SolicitudOrdenTrabajoModule } from './solicitudOrdenTrabajo/solicitudOrdenTrabajo.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClienteModule,
    HerramientaModule,
    SolicitudOrdenTrabajoModule,
    UtilModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    ClienteService,
    HerramientaService,
    ParametroService,
    SolicitudOrdenTrabajoService

  ],
  bootstrap: [AppComponent],
  exports: [
    UtilModule
  ],
})
export class AppModule { }
