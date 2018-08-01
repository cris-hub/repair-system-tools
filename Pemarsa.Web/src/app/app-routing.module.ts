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
import { ListarInspeccionesComponent } from './proceso/inspeccion/listar-inspecciones/listar-inspecciones.component';
import { InspeccionHerramientaComponent } from './proceso/inspeccion/inspeccion-herramienta/inspeccion-herramienta.component';
import { VRComponent } from './proceso/inspeccion/vr/vr.component';
import { UTComponent } from './proceso/inspeccion/ut/ut.component';
import { EMIComponent } from './proceso/inspeccion/emi/emi.component';
import { LPIComponent } from './proceso/inspeccion/lpi/lpi.component';
import { VisualDimensionalMotorComponent } from './proceso/inspeccion//visual-dimensional-motor//visual-dimensional-motor.component';
import { MPIComponent } from './proceso/inspeccion/mpi/mpi.component';
import { UTAComponent } from './proceso/inspeccion/uta/uta.component';
import { VisualDimensionalComponent } from './proceso/inspeccion/visual-dimensional/visual-dimensional.component';
import { ProcesarOitComponent } from './coordinador/procesar-oit/procesar-oit.component';
import { OitCambioProcesoComponent } from './coordinador/oit-cambio-proceso/oit-cambio-proceso.component';

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





  //Procesos
  { path: 'inspeccion/entrada', component: ListarInspeccionesComponent },

  { path: 'inspeccion/entrada/:id/ver', component: InspeccionHerramientaComponent },
  { path: 'inspeccion/entrada/:id/:index/ver', component: InspeccionHerramientaComponent },
  //vr
  { path: 'inspeccion/entrada/vr/:id/:index/ver', component: VRComponent },
  { path: 'inspeccion/entrada/vr/:id/ver', component: VRComponent },

  //ut
  { path: 'inspeccion/entrada/ut/:id/:index/ver', component: UTComponent },
  { path: 'inspeccion/entrada/ut/:id/ver', component: UTComponent },

  //emi
  { path: 'inspeccion/entrada/emi/:id/:indexv', component: EMIComponent },
  { path: 'inspeccion/entrada/emi/:id/ver', component: EMIComponent },

  //lpi
  { path: 'inspeccion/entrada/lpi/:id/:index/ver', component: LPIComponent },
  { path: 'inspeccion/entrada/lpi/:id/ver', component: LPIComponent },

  //visualdimencional
  { path: 'inspeccion/entrada/visualdimensional/:id/:index/ver', component: VisualDimensionalComponent },
  { path: 'inspeccion/entrada/visualdimensional/:id/ver', component: VisualDimensionalComponent },
  //visualdimencional
  { path: 'inspeccion/entrada/visualdimensionalmotor/:id/:index/ver', component: VisualDimensionalMotorComponent },
  { path: 'inspeccion/entrada/visualdimensionalmotor/:id/ver', component: VisualDimensionalMotorComponent },


  //mpi
  { path: 'inspeccion/entrada/mpi/:id/:index/ver', component: MPIComponent },
  { path: 'inspeccion/entrada/mpi/:id/ver', component: MPIComponent },

  //mpi
  { path: 'inspeccion/entrada/uta/:id/:index/ver', component: UTAComponent },
  { path: 'inspeccion/entrada/uta/:id/ver', component: UTAComponent },






  //PROCERAR 

  { path: 'inspeccion/entrada/:id/procesar', component: InspeccionHerramientaComponent },
  { path: 'inspeccion/entrada/:id/:index/procesar', component: InspeccionHerramientaComponent },
  //vr
  { path: 'inspeccion/entrada/vr/:id/:index/procesar', component: VRComponent },
  { path: 'inspeccion/entrada/vr/:id/procesar', component: VRComponent },

  //ut
  { path: 'inspeccion/entrada/ut/:id/:index/procesar', component: UTComponent },
  { path: 'inspeccion/entrada/ut/:id/procesar', component: UTComponent },

  //emi
  { path: 'inspeccion/entrada/emi/:id/:index/procesar', component: EMIComponent },
  { path: 'inspeccion/entrada/emi/:id/procesar', component: EMIComponent },

  //lpi
  { path: 'inspeccion/entrada/lpi/:id/:index/procesar', component: LPIComponent },
  { path: 'inspeccion/entrada/lpi/:id/procesar', component: LPIComponent },

  //visualdimencional
  { path: 'inspeccion/entrada/visualdimensional/:id/:index/procesar', component: VisualDimensionalComponent },
  { path: 'inspeccion/entrada/visualdimensional/:id/procesar', component: VisualDimensionalComponent },
  //visualdimencional-motor
  { path: 'inspeccion/entrada/visualdimensionalmotor/:id/:index/procesar', component: VisualDimensionalMotorComponent },
  { path: 'inspeccion/entrada/visualdimensionalmotor/:id/procesar', component: VisualDimensionalMotorComponent },

  //mpi
  { path: 'inspeccion/entrada/mpi/:id/:index/procesar', component: MPIComponent },
  { path: 'inspeccion/entrada/mpi/:id/procesar', component: MPIComponent },

  //mpi
  { path: 'inspeccion/entrada/uta/:id/:index/procesar', component: UTAComponent },
  { path: 'inspeccion/entrada/uta/:id/procesar', component: UTAComponent },
  //PROCERAR 


  //Editar 

  { path: 'inspeccion/entrada/:id/editar', component: InspeccionHerramientaComponent },
  { path: 'inspeccion/entrada/:id/:index/editar', component: InspeccionHerramientaComponent },
  //vr
  { path: 'inspeccion/entrada/vr/:id/:index/editar', component: VRComponent },
  { path: 'inspeccion/entrada/vr/:id/editar', component: VRComponent },

  //ut
  { path: 'inspeccion/entrada/ut/:id/:index/editar', component: UTComponent },
  { path: 'inspeccion/entrada/ut/:id/editar', component: UTComponent },

  //emi
  { path: 'inspeccion/entrada/emi/:id/:index/editar', component: EMIComponent },
  { path: 'inspeccion/entrada/emi/:id/editar', component: EMIComponent },

  //lpi
  { path: 'inspeccion/entrada/lpi/:id/:index/editar', component: LPIComponent },
  { path: 'inspeccion/entrada/lpi/:id/editar', component: LPIComponent },

  //visualdimencional
  { path: 'inspeccion/entrada/visualdimensional/:id/:index/editar', component: VisualDimensionalComponent },
  { path: 'inspeccion/entrada/visualdimensional/:id/editar', component: VisualDimensionalComponent },
  //visualdimencional-motor
  { path: 'inspeccion/entrada/visualdimensionalmotor/:id/:index/editar', component: VisualDimensionalMotorComponent },
  { path: 'inspeccion/entrada/visualdimensionalmotor/:id/editar', component: VisualDimensionalMotorComponent },

  //mpi
  { path: 'inspeccion/entrada/mpi/:id/:index/editar', component: MPIComponent },
  { path: 'inspeccion/entrada/mpi/:id/editar', component: MPIComponent },

  //mpi
  { path: 'inspeccion/entrada/uta/:id/:index/editar', component: UTAComponent },
  { path: 'inspeccion/entrada/uta/:id/editar', component: UTAComponent },





  // procesos
  
  { path: 'procesos', component: OitCambioProcesoComponent },


  //OITs
  { path: 'oit', component: ListarOitComponent },
  { path: 'oit/nueva-oit', component: CrearOitComponent },
  { path: 'oit/:id', component: CrearOitComponent },
  { path: 'oit/:id/editar', component: CrearOitComponent },
  { path: 'oit/:id/procesar', component: CrearOitComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
