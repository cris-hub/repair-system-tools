import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { UtilModule } from '../common/modules/util.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ListarSolicitudOrdenTrabajoComponent, FiltroSolicitudOrdenTrabajoComponent, CrearSolicitudOrdenTrabajoComponent
} from "./solicitudOrdenTrabajo/index";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    ListarSolicitudOrdenTrabajoComponent,
    FiltroSolicitudOrdenTrabajoComponent,
    CrearSolicitudOrdenTrabajoComponent
  ],
  exports: [
    ListarSolicitudOrdenTrabajoComponent
  ]
})
export class SolicitudOrdenTrabajoModule { }
