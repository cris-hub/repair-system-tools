import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../common/modules/util.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListarInspeccionesComponent } from './inspeccion/listar-inspecciones/listar-inspecciones.component';
import { InspeccionHerramientaComponent } from './inspeccion/inspeccion-herramienta/inspeccion-herramienta.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UtilModule,
    NgxPaginationModule
  ],
  declarations: [ListarInspeccionesComponent, InspeccionHerramientaComponent]
})
export class ProcesoModule { }
