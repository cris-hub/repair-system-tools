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

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule,
    ReactiveFormsModule,
    RouterModule
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
