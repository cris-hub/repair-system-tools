import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UtilModule } from '../common/modules/util.module';
import {
  ListarClienteComponent
} from './cliente/index'

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule
  ],
  declarations: [
    ListarClienteComponent
  ],
  exports: [
    ListarClienteComponent
  ],
  entryComponents: []
})
export class ClienteModule { }
