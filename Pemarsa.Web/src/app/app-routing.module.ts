import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './common/components/home/home.component';


import { ListarClienteComponent } from './cliente/cliente/listar-cliente/listar-cliente.component';
import { ClienteModule } from './cliente/cliente.module';
import { HerramientaModule } from './herramienta/herramienta.module';
import { CrearClienteComponent } from './cliente/cliente/crear-cliente/crear-cliente.component';
import { ListarHerramientaComponent, CrearHerramientaComponent } from './herramienta/herramienta';
import { ListarSolicitudOrdenTrabajoComponent } from './solicitudOrdenTrabajo/solicitudOrdenTrabajo';
import { CrearFormatoComponent } from './formato/crear-formato/crear-formato.component';
import { ListarFormatoComponent } from './formato/listar-formato/listar-formato.component';
import { ListarOitComponent } from './orden-trabajo/listar-oit/listar-oit.component';
import { CrearOitComponent } from './orden-trabajo/crear-oit/crear-oit.component';
import { ListarInspeccionesEntradaComponent } from './proceso/inspeccion-entrada/listar-inspecciones/listar-inspecciones.component';
import { InspeccionHerramientaComponent } from './proceso/inspeccion-entrada/inspeccion-herramienta/inspeccion-herramienta.component';
import { VRComponent } from './proceso/inspeccion-entrada/vr/vr.component';
import { UTComponent } from './proceso/inspeccion-entrada/ut/ut.component';
import { EMIComponent } from './proceso/inspeccion-entrada/emi/emi.component';
import { LPIComponent } from './proceso/inspeccion-entrada/lpi/lpi.component';
import { VisualDimensionalMotorComponent } from './proceso/inspeccion-entrada//visual-dimensional-motor//visual-dimensional-motor.component';
import { MPIComponent } from './proceso/inspeccion-entrada/mpi/mpi.component';
import { UTAComponent } from './proceso/inspeccion-entrada/uta/uta.component';
import { VisualDimensionalComponent } from './proceso/inspeccion-entrada/visual-dimensional/visual-dimensional.component';

import { HistorialProcesosComponent } from './orden-trabajo/historial-procesos/historial-procesos.component';
import { OitCambioProcesoComponent } from './proceso/coordinador/oit-cambio-proceso/oit-cambio-proceso.component';
import { ProcesarOitComponent } from './proceso/coordinador/procesar-oit/procesar-oit.component';

const routes: Routes = [

  //Common
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //Cliente
  { path: 'cliente', component: ListarClienteComponent },
  { path: 'cliente/crear', component: CrearClienteComponent },
  { path: 'cliente/editar/:id', component: CrearClienteComponent },
  { path: 'cliente/ver/:id', component: CrearClienteComponent },


  //formato
  { path: 'formato', component: ListarFormatoComponent },
  { path: 'formato/crear', component: CrearFormatoComponent },
  { path: 'formato/editar/:id', component: CrearFormatoComponent },
  { path: 'formato/ver/:id', component: CrearFormatoComponent },

  //Herramienta
  { path: 'herramienta', component: ListarHerramientaComponent },
  { path: 'herramienta/crear', component: CrearHerramientaComponent },
  { path: 'herramienta/editar/:id', component: CrearHerramientaComponent },
  { path: 'herramienta/ver/:id', component: CrearHerramientaComponent },

  //SolicitudOrdenTrabajo
  { path: 'solicitudOrdenTrabajo', component: ListarSolicitudOrdenTrabajoComponent },

  //OITs
  { path: 'oit', component: ListarOitComponent },
  { path: 'oit/historial-procesos/:id', component: HistorialProcesosComponent },
  { path: 'oit/nueva-oit', component: CrearOitComponent },
  { path: 'oit/:id', component: CrearOitComponent },
  { path: 'oit/:id/editar', component: CrearOitComponent },
  { path: 'oit/:id/procesar', component: CrearOitComponent },

  {
    path: 'inspeccion/entrada', loadChildren: './proceso/inspeccion-entrada/inspeccion-entrada.module#InspeccionEntradaModule'
  },
  {
    path: 'inspeccion/salida', loadChildren: './proceso/inspeccion-salida/inspeccion-salida.module#InspeccionSalidaModule'
  },
  {
    path: 'mecanizado/fresa', loadChildren: './proceso/mecanizado-fresa/mecanizado-fresa.module#MecanizadoFresaModule'
  },
  {
    path: 'mecanizado/torno', loadChildren: './proceso/mecanizado-torno/mecanizado-torno.module#MecanizadoTornoModule'
  },
  {
    path: 'alistamiento', loadChildren: './proceso/alistamiento/alistamiento.module#AlistamientoModule'
  },
  {
    path: 'soldadura', loadChildren: './proceso/soldadura/soldadura.module#SoldaduraModule'
  },
  
    // aprobacion
  
  { path: 'aprobacion-supervisor', component: OitCambioProcesoComponent },
  { path: 'aprobacion-supervisor/procesar/:id', component: ProcesarOitComponent },
  { path: 'aprobacion-supervisor/:id', component: ProcesarOitComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
