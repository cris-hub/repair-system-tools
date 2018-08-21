import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { UtilModule } from '../common/modules/util.module';
import {
  ListarClienteComponent,
  FiltroClienteComponent,
  LineaClienteComponent,
  CrearClienteComponent
} from './cliente/index'
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    UtilModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2SearchPipeModule,


  ],
  declarations: [
    ListarClienteComponent,
    FiltroClienteComponent,
    LineaClienteComponent,
    CrearClienteComponent
  ],
  exports: [
    ListarClienteComponent
  ],
  entryComponents: []
})
export class ClienteModule { }
