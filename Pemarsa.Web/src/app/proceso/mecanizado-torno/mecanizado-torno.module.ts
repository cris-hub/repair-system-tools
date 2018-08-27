import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarMecanizadoComponent } from './listar-mecanizado/listar-mecanizado.component';
import { ProcesarMecanizadoComponent } from './procesar-mecanizado/procesar-mecanizado.component';
import { MecanizadoTornoRoutingModule } from './mecanizado-torno.routing.module';
import { UtilModule } from '../../common/modules/util.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoordinadorModule } from '../coordinador/coordinador.module';
import { ProcesoModule } from '../proceso.module';

@NgModule({
  imports: [
    MecanizadoTornoRoutingModule,
    CommonModule,
    ProcesoModule,

    CoordinadorModule,
    UtilModule,
    
  ],
  declarations: [ListarMecanizadoComponent, ProcesarMecanizadoComponent]
})
export class MecanizadoTornoModule { }
