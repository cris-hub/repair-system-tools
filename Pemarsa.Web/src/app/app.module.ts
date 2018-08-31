import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterConfigLoader } from '@angular/router/src/router_config_loader';
import { ConfigLoader } from './common/config/config.loader';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, BrowserXhr } from '@angular/http';


import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './common/components/home/home.component';

import { ClienteModule } from './cliente/cliente.module';
import { ClienteService, HerramientaService, SolicitudOrdenTrabajoService, FormatoService, ProcesoService } from './common/services/entity';
import { HerramientaModule } from './herramienta/herramienta.module';
import { ConfigService } from './common/config/config.service';
import { UtilModule } from './common/modules/util.module';
import { ParametroService } from './common/services/entity/parametro.service';
import { SolicitudOrdenTrabajoModule } from './solicitudOrdenTrabajo/solicitudOrdenTrabajo.module';
import { FormatoModule } from './formato/formato.module';
import { OrdenTrabajoModule } from './orden-trabajo/orden-trabajo.module';
import { OrdenTrabajoService } from './common/services/entity/orden-trabajo.service';
import { ProcesoModule } from './proceso/proceso.module';
import { PemarsaStringFormat } from './common/pipes/pemarsaStringFormat';
import { LoaderService } from './common/services/entity/loaderService';
import { CoordinadorModule } from './proceso/coordinador/coordinador.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoordinadorModule,
    ClienteModule,
    FormatoModule,
    OrdenTrabajoModule,
    HerramientaModule,
    ProcesoModule,
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
    SolicitudOrdenTrabajoService,
    FormatoService,
    OrdenTrabajoService,
    ProcesoService,
    LoaderService,

    
    
  ],
  bootstrap: [AppComponent],
  exports: [
    UtilModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
