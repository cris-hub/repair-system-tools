import { NgModule } from '@angular/core'
import { PaginationComponent } from '../directivas/paginacion/paginacion.component';
import { ConfirmacionComponent } from '../directivas/confirmacion/confirmacion.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    PaginationComponent,
    ConfirmacionComponent
  ],

  exports: [
    PaginationComponent,
    ConfirmacionComponent
  ],

  providers: [
  ]
})

export class UtilModule { }
