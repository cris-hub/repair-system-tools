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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CatalogoPipe } from '../pipes/catalogoPipe';
import { FiltroProcesoComponent } from '../../proceso/filtro-proceso/filtro-proceso.component';
import { SiguienteProcesoComponent } from '../../proceso/coordinador/siguiente-proceso/siguiente-proceso.component';
import { SugerirProcesoComponent } from '../../proceso/coordinador/sugerir-proceso/sugerir-proceso.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UploadFileComponent } from '../../common-proceso/upload-file/upload-file.component';
import { SafePipe } from '../../proceso/common-proceso/inspeccion-conexion-motor/inspeccion-conexion.component-motor';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
    AngularFontAwesomeModule,
    
  ],

  declarations: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    AutocompletarComponent,
    PemarsaStringFormat,
    SafePipe ,
    SiguienteProcesoComponent,
    SugerirProcesoComponent,
    CatalogoPipe,
    filterEstadoConexionPorConexion,
    pemarsaAdendumPipe,
    FiltroProcesoComponent,
    filtrarColumnasAdendumPorTipoPipe,
    UploadFileComponent
  ],

  exports: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    SafePipe ,
    SugerirProcesoComponent,
    SiguienteProcesoComponent,
    AutocompletarComponent,
    PemarsaStringFormat,
    CatalogoPipe,
    FiltroProcesoComponent,
    FormsModule,
    AngularFontAwesomeModule,
    UploadFileComponent,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    filterEstadoConexionPorConexion,
    pemarsaAdendumPipe,
    filtrarColumnasAdendumPorTipoPipe,
    CommonModule,
    NgbModule,
  ],

  providers: [
  ]
})

export class UtilModule { }
