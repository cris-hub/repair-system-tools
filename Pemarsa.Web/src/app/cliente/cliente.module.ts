import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UtilModule } from '../common/modules/util.module';
import {
  ListarClienteComponent,
  FiltroClienteComponent,
  LineaClienteComponent
} from './cliente/index'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListarClienteComponent,
    FiltroClienteComponent,
    LineaClienteComponent
  ],
  exports: [
    ListarClienteComponent
  ],
  entryComponents: []
})
export class ClienteModule { }