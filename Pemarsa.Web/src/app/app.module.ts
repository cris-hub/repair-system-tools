import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterConfigLoader } from '@angular/router/src/router_config_loader';
import { ConfigLoader } from './common/config/config.loader';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './common/components/home/home.component';

import { ClienteModule } from './cliente/cliente.module';
import { ClienteService } from './common/services/entity';
import { ConfigService } from './common/config/config.service';
import { UtilModule } from './common/modules/util.module';
import { ParametroService } from './common/services/entity/parametro.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClienteModule,
    UtilModule,
    AppRoutingModule    
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
    ParametroService

  ],
  bootstrap: [AppComponent],
  exports: [
    UtilModule
  ],
})
export class AppModule { }
