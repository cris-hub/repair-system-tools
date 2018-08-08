import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../common/modules/util.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListarInspeccionesComponent } from './inspeccion-entrada/listar-inspecciones/listar-inspecciones.component';
import { InspeccionHerramientaComponent } from './inspeccion-entrada/inspeccion-herramienta/inspeccion-herramienta.component';

import { VRComponent } from './inspeccion-entrada/vr/vr.component';
import { UTComponent } from './inspeccion-entrada/ut/ut.component';
import { VisualDimensionalMotorComponent } from './inspeccion-entrada//visual-dimensional-motor//visual-dimensional-motor.component';
import { LPIComponent } from './inspeccion-entrada/lpi/lpi.component';
import { UTAComponent } from './inspeccion-entrada/uta/uta.component';
import { MPIComponent } from './inspeccion-entrada/mpi/mpi.component';
import { EMIComponent } from './inspeccion-entrada/emi/emi.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisualDimensionalComponent } from './inspeccion-entrada/visual-dimensional/visual-dimensional.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UtilModule,
    NgxPaginationModule,
    NgbModule,

  ],
  declarations: [ListarInspeccionesComponent, InspeccionHerramientaComponent, VRComponent, UTComponent, VisualDimensionalMotorComponent, MPIComponent, EMIComponent, LPIComponent, UTAComponent, VisualDimensionalComponent]
  
})
export class ProcesoModule { }
