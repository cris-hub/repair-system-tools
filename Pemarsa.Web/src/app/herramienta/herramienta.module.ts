import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { UtilModule } from '../common/modules/util.module';
import {
  ListarHerramientaComponent
} from './herramienta/index'
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
    ListarHerramientaComponent
  ],
  exports: [
    ListarHerramientaComponent
  ],
  entryComponents: []
})
export class HerramientaModule { }
