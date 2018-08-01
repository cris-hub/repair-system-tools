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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],

  declarations: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    AutocompletarComponent,
    PemarsaStringFormat,
    SugerirProcesoComponent,
    filterEstadoConexionPorConexion,
    pemarsaAdendumPipe,
    filtrarColumnasAdendumPorTipoPipe,
  ],

  exports: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    SugerirProcesoComponent,
    AutocompletarComponent,
    PemarsaStringFormat,
    filterEstadoConexionPorConexion,
    pemarsaAdendumPipe,
    filtrarColumnasAdendumPorTipoPipe,
  ],

  providers: [
  ]
})

export class UtilModule { }
