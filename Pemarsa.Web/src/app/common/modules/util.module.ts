import { NgModule } from '@angular/core'
import { PaginationComponent } from '../directivas/paginacion/paginacion.component';
import { ConfirmacionComponent } from '../directivas/confirmacion/confirmacion.component';
import { CommonModule } from '@angular/common';
import { ValidacionDirective } from '../directivas/validacion/validacion.directive';

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective
  ],

  exports: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective
  ],

  providers: [
  ]
})

export class UtilModule { }
