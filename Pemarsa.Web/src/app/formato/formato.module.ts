import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CrearFormatoComponent } from './crear-formato/crear-formato.component';
import { UtilModule } from '../common/modules/util.module';
import { ListarFormatoComponent } from './listar-formato/listar-formato.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroFormatoComponent } from './filtro-formato/filtro-formato.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdendumComponent } from './adendum/adendum.component';
import { ParametrosComponent } from './parametros/parametros.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UtilModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [CrearFormatoComponent, ListarFormatoComponent, FiltroFormatoComponent, AdendumComponent, ParametrosComponent],
  exports: [
    CrearFormatoComponent,
    AdendumComponent,
    ParametrosComponent
  ]
})
export class FormatoModule { }
