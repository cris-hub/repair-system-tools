import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarOitComponent } from './listar-oit/listar-oit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UtilModule } from '../common/modules/util.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearOitComponent } from './crear-oit/crear-oit.component';
import { AutocompletarComponent } from '../common/directivas/autocompletar/autocompletar.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FiltroOrdenTrabajoComponent } from './filtro-orden-trabajo/filtro-orden-trabajo.component';
import { HistorialModificacionesComponent } from './historial-modificaciones/historial-modificaciones.component';

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
  declarations: [ ListarOitComponent, CrearOitComponent, FiltroOrdenTrabajoComponent, HistorialModificacionesComponent]
})
export class OrdenTrabajoModule { }
