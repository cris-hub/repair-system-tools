import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { UtilModule } from '../common/modules/util.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ListarSolicitudOrdenTrabajoComponent
} from "./solicitudOrdenTrabajo/index";
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ListarSolicitudOrdenTrabajoComponent
  ],
  exports: [
    ListarSolicitudOrdenTrabajoComponent
  ]
})
export class SolicitudOrdenTrabajoModule { }
