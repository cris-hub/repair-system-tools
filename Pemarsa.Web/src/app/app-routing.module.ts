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
import { VisualDimensionalComponent } from './proceso/inspeccion/visualdimencional/visualdimencional.component';
import { MPIComponent } from './proceso/inspeccion/mpi/mpi.component';
import { UTAComponent } from './proceso/inspeccion/uta/uta.component';

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
  { path: 'inspeccion/entrada/:id', component: InspeccionHerramientaComponent },
  { path: 'inspeccion/entrada/:id/:index', component: InspeccionHerramientaComponent },
  //vr
  { path: 'inspeccion/entrada/vr/:id/:index', component: VRComponent },
  { path: 'inspeccion/entrada/vr/:id', component: VRComponent },

  //ut
  { path: 'inspeccion/entrada/ut/:id/:index', component: UTComponent },
  { path: 'inspeccion/entrada/ut/:id', component: UTComponent },

  //emi
  { path: 'inspeccion/entrada/emi/:id/:index', component: EMIComponent },
  { path: 'inspeccion/entrada/emi/:id', component: EMIComponent },

  //lpi
  { path: 'inspeccion/entrada/lpi/:id/:index', component: LPIComponent },
  { path: 'inspeccion/entrada/lpi/:id', component: LPIComponent },

  //visualdimencional
  { path: 'inspeccion/entrada/visualdimensional/:id/:index', component: VisualDimensionalComponent },
  { path: 'inspeccion/entrada/visualdimensional/:id', component: VisualDimensionalComponent },


  //mpi
  { path: 'inspeccion/entrada/mpi/:id/:index', component: MPIComponent },
  { path: 'inspeccion/entrada/mpi/:id', component: MPIComponent },

  //mpi
  { path: 'inspeccion/entrada/uta/:id/:index', component: UTAComponent },
  { path: 'inspeccion/entrada/uta/:id', component: UTAComponent },

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
