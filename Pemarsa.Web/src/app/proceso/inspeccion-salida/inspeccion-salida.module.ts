import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';

import { ListarInspeccionesSalidaComponent } from './listar-inspecciones/listar-inspecciones.component';
import { InspeccionHerramientaComponent } from './inspeccion-herramienta/inspeccion-herramienta.component';

import { VRComponent } from './vr/vr.component';
import { UTComponent } from './ut/ut.component';
import { VisualDimensionalMotorComponent } from './visual-dimensional-motor//visual-dimensional-motor.component';
import { LPIComponent } from './lpi/lpi.component';
import { UTAComponent } from './uta/uta.component';
import { MPIComponent } from './mpi/mpi.component';
import { EMIComponent } from './emi/emi.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisualDimensionalComponent } from './visual-dimensional/visual-dimensional.component';
import { UtilModule } from '../../common/modules/util.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InspeccionSalidaRoutingModule } from './inspeccion-salida.routing.module';

@NgModule({
  imports: [
    CommonModule,
    InspeccionSalidaRoutingModule,
    ReactiveFormsModule,
    UtilModule,
    NgxPaginationModule,
    NgbModule,

  ],
  declarations: [ListarInspeccionesSalidaComponent, InspeccionHerramientaComponent, VRComponent, UTComponent, VisualDimensionalMotorComponent, MPIComponent, EMIComponent, LPIComponent, UTAComponent, VisualDimensionalComponent]
  , exports: [ListarInspeccionesSalidaComponent, InspeccionHerramientaComponent, VRComponent, UTComponent, VisualDimensionalMotorComponent, MPIComponent, EMIComponent, LPIComponent, UTAComponent, VisualDimensionalComponent]

})
export class InspeccionSalidaModule { }
