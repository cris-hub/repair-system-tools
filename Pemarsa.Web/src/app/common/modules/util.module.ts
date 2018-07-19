import { NgModule } from '@angular/core'
import { PaginationComponent } from '../directivas/paginacion/paginacion.component';
import { ConfirmacionComponent } from '../directivas/confirmacion/confirmacion.component';
import { CommonModule } from '@angular/common';
import { ValidacionDirective } from '../directivas/validacion/validacion.directive';
import { AutocompletarComponent } from '../directivas/autocompletar/autocompletar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PemarsaStringFormat } from '../pipes/pemarsaStringFormat';

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
    PemarsaStringFormat
   
  ],

  exports: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    AutocompletarComponent,
    PemarsaStringFormat

  ],

  providers: [
  ]
})

export class UtilModule { }
