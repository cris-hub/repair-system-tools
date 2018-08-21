import { NgModule } from '@angular/core'
import { PaginationComponent } from '../directivas/paginacion/paginacion.component';
import { ConfirmacionComponent } from '../directivas/confirmacion/confirmacion.component';
import { CommonModule } from '@angular/common';
import { ValidacionDirective } from '../directivas/validacion/validacion.directive';
import { AutocompletarComponent } from '../directivas/autocompletar/autocompletar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PemarsaStringFormat } from '../pipes/pemarsaStringFormat';
import { filterEstadoConexionPorConexion } from '../pipes/filterEstadosConexion';
import { pemarsaAdendumPipe } from '../pipes/pemarsaAdendumPipe';
import { filtrarColumnasAdendumPorTipoPipe } from '../pipes/filtrarColumnasAdendumPorTipoPipe';
import { SugerirProcesoComponent } from '../../coordinador/sugerir-proceso/sugerir-proceso.component';
import { SiguienteProcesoComponent } from '../../coordinador/siguiente-proceso/siguiente-proceso.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CatalogoPipe } from '../pipes/catalogoPipe';
import { FiltroProcesoComponent } from '../../proceso/filtro-proceso/filtro-proceso.component';
import { DetalleProcesoComponent } from '../../proceso/common-proceso/detalle-proceso/detalle-proceso.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,

  ],

  declarations: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    AutocompletarComponent,
    PemarsaStringFormat,
    SiguienteProcesoComponent,
    SugerirProcesoComponent,
    CatalogoPipe,
    filterEstadoConexionPorConexion,
    pemarsaAdendumPipe,
    FiltroProcesoComponent,
    filtrarColumnasAdendumPorTipoPipe,
    DetalleProcesoComponent
  ],

  exports: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    SugerirProcesoComponent,
    SiguienteProcesoComponent,
    AutocompletarComponent,
    PemarsaStringFormat,
    CatalogoPipe,
    FiltroProcesoComponent,
    filterEstadoConexionPorConexion,
    pemarsaAdendumPipe,
    filtrarColumnasAdendumPorTipoPipe,
    DetalleProcesoComponent,
  ],

  providers: [
  ]
})

export class UtilModule { }
