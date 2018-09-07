import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemisionesListarComponent } from './remisiones-listar/remisiones-listar.component';
import { RemisionesPendientesRoutingModule } from 'src/app/remision/remisiones-pendientes/remisiones-pendientes.routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from 'src/app/common/modules/util.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FiltroRemisionesComponent } from 'src/app/remision/remisiones-pendientes/filtro-remisiones/filtro-remisiones.component';
import { ObservacionRemisionPendienteComponent } from 'src/app/remision/remisiones-pendientes/observacion-remision-pendiente/observacion-remision-pendiente.component';
import { AdjuntarRemisionComponent } from 'src/app/remision/remisiones-pendientes/adjuntar-remision/adjuntar-remision.component';

@NgModule({
  imports: [
    CommonModule,
    RemisionesPendientesRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    UtilModule,
    NgbModule,
    FormsModule

  ],
  declarations: [
    RemisionesListarComponent,
    FiltroRemisionesComponent,
    ObservacionRemisionPendienteComponent,
    AdjuntarRemisionComponent
  ]
})
export class RemisionesPendientesModule { }
