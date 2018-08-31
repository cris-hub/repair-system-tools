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
import { InspeccionConexionMotorComponent, SafePipe } from './common-proceso/inspeccion-conexion-motor/inspeccion-conexion.component-motor';
import { ConexionInspeccionComponent } from './common-proceso/conexion-inspeccion/conexion-inspeccion.component';
import { ProcesarInspeccionDimensionalComponent } from './mecanizado-torno/procesar-inspeccion-dimensional/procesar-inspeccion-dimensional.component';
import { FormatoModule } from '../formato/formato.module';
import { EquipoMedicionComponent } from 'src/app/proceso/common-proceso/equipo-medicion/equipo-medicion.component';
import { TrazabilidadProcesoComponent } from 'src/app/proceso/soldadura/forms-trazabilidad/trazabilidad-proceso/trazabilidad-proceso.component';
import { FormTrazabilidadComponent } from 'src/app/proceso/soldadura/forms-trazabilidad/form-trazabilidad/form-trazabilidad.component';
import { TrazabilidadEstructuralComponent } from 'src/app/proceso/soldadura/forms-trazabilidad/trazabilidad-estructural/trazabilidad-estructural.component';
import { TrazabilidadTungstenoComponent } from 'src/app/proceso/soldadura/forms-trazabilidad/trazabilidad-tungsteno/trazabilidad-tungsteno.component';
import { TrazabilidadPtaComponent } from 'src/app/proceso/soldadura/forms-trazabilidad/trazabilidad-pta/trazabilidad-pta.component';
import { TrazabilidadBrocasComponent } from 'src/app/proceso/soldadura/forms-trazabilidad/trazabilidad-brocas/trazabilidad-brocas.component';
import { TrazabilidadOtroComponent } from 'src/app/proceso/soldadura/forms-trazabilidad/trazabilidad-otro/trazabilidad-otro.component';
import { InspeccionConexionComponent } from './common-proceso/inspeccion-conexion/inspeccion-conexion.component';
import { ProcesarInspeccionComponent } from './mecanizado-torno/procesar-inspeccion/procesar-inspeccion.component';




@NgModule({
  imports: [
    CommonModule,
    UtilModule,
    FormatoModule,




  ],
  declarations: [
    EquipoMedicionComponent,
    DetalleProcesoComponent,
    AsignarProcesoComponent,
    ProcesarInspeccionDimensionalComponent,
    TrabajoRealizadoComponent,
    InspeccionConexionComponent,
    ConexionInspeccionComponent,
    TrazabilidadProcesoComponent,
    FormTrazabilidadComponent,
    TrazabilidadEstructuralComponent, SafePipe,
    TrazabilidadTungstenoComponent,
    TrazabilidadPtaComponent,
    TrazabilidadBrocasComponent,
    InspeccionConexionMotorComponent,
    TrazabilidadOtroComponent, ProcesarInspeccionComponent

  ],
  exports: [
    EquipoMedicionComponent,
    DetalleProcesoComponent,
    TrabajoRealizadoComponent,
    ProcesarInspeccionDimensionalComponent,
    AsignarProcesoComponent,
    InspeccionConexionComponent,
    ProcesarInspeccionComponent,
    InspeccionConexionMotorComponent,
    ConexionInspeccionComponent, SafePipe,
    TrazabilidadProcesoComponent,
    FormTrazabilidadComponent,
    TrazabilidadEstructuralComponent,
    TrazabilidadTungstenoComponent,
    TrazabilidadPtaComponent,
    TrazabilidadBrocasComponent,
    TrazabilidadOtroComponent
  ]
})
export class ProcesoModule { }
