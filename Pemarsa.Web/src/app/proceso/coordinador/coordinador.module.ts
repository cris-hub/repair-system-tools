import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SugerirProcesoComponent } from './sugerir-proceso/sugerir-proceso.component';
import { OitCambioProcesoComponent } from './oit-cambio-proceso/oit-cambio-proceso.component';
import { CriterioLiberacionComponent } from './criterio-liberacion/criterio-liberacion.component';
import { SiguienteProcesoComponent } from './siguiente-proceso/siguiente-proceso.component';
import { ProcesarOitComponent } from './procesar-oit/procesar-oit.component';
import { NgxPaginationModule } from 'ngx-pagination';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ObservacionRechazoComponent } from './observacion-rechazo/observacion-rechazo.component';
import { UtilModule } from '../../common/modules/util.module';
import { ProcesoModule } from '../proceso.module';
import { LiberarProcesoRemisionComponent } from './liberar-proceso-remision/liberar-proceso-remision.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
    ProcesoModule
  ],
  declarations: [OitCambioProcesoComponent, CriterioLiberacionComponent, ProcesarOitComponent, ObservacionRechazoComponent, LiberarProcesoRemisionComponent], exports: [ObservacionRechazoComponent, LiberarProcesoRemisionComponent]
})
export class CoordinadorModule { }
