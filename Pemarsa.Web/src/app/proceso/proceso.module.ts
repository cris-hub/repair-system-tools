import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../common/modules/util.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListarInspeccionesComponent } from './inspeccion/listar-inspecciones/listar-inspecciones.component';
import { InspeccionHerramientaComponent } from './inspeccion/inspeccion-herramienta/inspeccion-herramienta.component';

import { VRComponent } from './inspeccion/vr/vr.component';
import { UTComponent } from './inspeccion/ut/ut.component';
import { VisualDimensionalComponent } from './inspeccion/visualdimencional/visualdimencional.component';
import { LPIComponent } from './inspeccion/lpi/lpi.component';
import { UTAComponent } from './inspeccion/uta/uta.component';
import { MPIComponent } from './inspeccion/mpi/mpi.component';
import { EMIComponent } from './inspeccion/emi/emi.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UtilModule,
    NgxPaginationModule
  ],
  declarations: [ListarInspeccionesComponent, InspeccionHerramientaComponent, VRComponent, UTComponent, VisualDimensionalComponent, MPIComponent, EMIComponent, LPIComponent, UTAComponent]
  
})
export class ProcesoModule { }
