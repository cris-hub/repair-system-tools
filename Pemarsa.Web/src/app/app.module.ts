import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MaterialModule } from './common/modules/material.module';
import { MatPaginatorIntl } from '@angular/material';

import { NgModule } from '@angular/core';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { MenuComponent } from './shared/menu/menu.component';

import {
  //EmpresaService,
  //ParametroService,
  //ClienteService,
  //ContactoService,
} from './common/services/entity/index';

import { AppComponent } from './app.component';
import { LoginComponent } from './common/components/login/login.component';
import { HomeComponent } from './common/components/home/home.component';
import { LogoutComponent } from './common/components/logout/logout.component';

import { ValidatorComponent } from './shared/validator/validator.component';
import { RouterConfigLoader } from '@angular/router/src/router_config_loader';
import { ConfigService } from './common/config/config.service';
import { ConfigLoader } from './common/config/config.loader';
import { getSpanishPaginator } from './shared/paginator/paginator.spanish';
import { AppRoutingModule } from './/app-routing.module';
//import { AdministradorPlataformaModule } from './administrador-plataforma/administrador-plataforma.module';
import { SharedModule } from './shared/shared.module';
//import { ConfiguracionModule } from './administrador-plataforma/configuracion/configuracion.module';
//import { FaseService } from './common/services/entity/fase.service';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
//import { PapelTrabajoService } from './common/services/entity/papelTrabajo.service';
//import { ClienteModule } from './cliente/cliente.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    //AdministradorPlataformaModule,
    //ClienteModule,
    //ConfiguracionModule,
    DragulaModule,
    BootstrapModalModule

  ],
  providers: [
    ConfigService,    
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useValue: getSpanishPaginator()
    },

    //EmpresaService,
    //ParametroService,
    //FaseService,
    //PapelTrabajoService,
    //ClienteService,
    //ContactoService
  ],
  bootstrap: [AppComponent],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
  ],
  
})
export class AppModule { }
