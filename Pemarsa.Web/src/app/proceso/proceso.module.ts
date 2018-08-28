import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilModule } from '../common/modules/util.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListarInspeccionesEntradaComponent } from './inspeccion-entrada/listar-inspecciones/listar-inspecciones.component';
import { InspeccionHerramientaComponent } from './inspeccion-entrada/inspeccion-herramienta/inspeccion-herramienta.component';

import { VRComponent } from './inspeccion-entrada/vr/vr.component';
import { UTComponent } from './inspeccion-entrada/ut/ut.component';
import { VisualDimensionalMotorComponent } from './inspeccion-entrada//visual-dimensional-motor//visual-dimensional-motor.component';
import { LPIComponent } from './inspeccion-entrada/lpi/lpi.component';
import { UTAComponent } from './inspeccion-entrada/uta/uta.component';
import { MPIComponent } from './inspeccion-entrada/mpi/mpi.component';
import { EMIComponent } from './inspeccion-entrada/emi/emi.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisualDimensionalComponent } from './inspeccion-entrada/visual-dimensional/visual-dimensional.component';
import { InspeccionEntradaModule } from './inspeccion-entrada/inspeccion-entrada.module';
import { InspeccionSalidaModule } from './inspeccion-salida/inspeccion-salida.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ObservacionRechazoComponent } from './coordinador/observacion-rechazo/observacion-rechazo.component';
import { CoordinadorModule } from './coordinador/coordinador.module';
import { MecanizadoTornoModule } from './mecanizado-torno/mecanizado-torno.module';
import { DetalleProcesoComponent } from './common-proceso/detalle-proceso/detalle-proceso.component';

import { TrabajoRealizadoComponent } from './common-proceso/trabajo-realizado/trabajo-realizado.component';
import { AsignarProcesoComponent } from './common-proceso/asignar-proceso/asignar-proceso.component';
import { InspeccionConexionComponent } from './common-proceso/inspeccion-conexion/inspeccion-conexion.component';
import { ConexionInspeccionComponent } from './common-proceso/conexion-inspeccion/conexion-inspeccion.component';




@NgModule({
  imports: [
    CommonModule,
    UtilModule,
    
    

  ],
  declarations: [DetalleProcesoComponent, AsignarProcesoComponent, TrabajoRealizadoComponent, InspeccionConexionComponent, ConexionInspeccionComponent], exports: [DetalleProcesoComponent, TrabajoRealizadoComponent, AsignarProcesoComponent, InspeccionConexionComponent, ConexionInspeccionComponent]
})
export class ProcesoModule { }
