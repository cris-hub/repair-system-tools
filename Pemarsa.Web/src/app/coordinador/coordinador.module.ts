import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SugerirProcesoComponent } from './sugerir-proceso/sugerir-proceso.component';
import { OitCambioProcesoComponent } from './oit-cambio-proceso/oit-cambio-proceso.component';
import { CriterioLiberacionComponent } from './criterio-liberacion/criterio-liberacion.component';
import { SiguienteProcesoComponent } from './siguiente-proceso/siguiente-proceso.component';
import { ProcesarOitComponent } from './procesar-oit/procesar-oit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UtilModule } from '../common/modules/util.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  declarations: [ OitCambioProcesoComponent, CriterioLiberacionComponent, SiguienteProcesoComponent, ProcesarOitComponent]
})
export class CoordinadorModule { }
