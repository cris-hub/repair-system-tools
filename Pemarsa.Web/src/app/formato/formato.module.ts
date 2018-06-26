import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CrearFormatoComponent } from './crear-formato/crear-formato.component';
import { UtilModule } from '../common/modules/util.module';
import { ListarFormatoComponent } from './listar-formato/listar-formato.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroFormatoComponent } from './filtro-formato/filtro-formato.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UtilModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [CrearFormatoComponent, ListarFormatoComponent, FiltroFormatoComponent],
  exports: [
    CrearFormatoComponent
  ]
})
export class FormatoModule { }
