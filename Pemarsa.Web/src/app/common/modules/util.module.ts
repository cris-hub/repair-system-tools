import { NgModule } from '@angular/core'
import { PaginationComponent } from '../directivas/paginacion/paginacion.component';
import { ConfirmacionComponent } from '../directivas/confirmacion/confirmacion.component';


@NgModule({
  imports: [
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
