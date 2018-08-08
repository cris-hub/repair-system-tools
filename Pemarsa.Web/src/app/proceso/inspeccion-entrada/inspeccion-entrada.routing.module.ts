import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarInspeccionesComponent } from './listar-inspecciones/listar-inspecciones.component';
import { InspeccionHerramientaComponent } from './inspeccion-herramienta/inspeccion-herramienta.component';
import { VRComponent } from './vr/vr.component';
import { UTComponent } from './ut/ut.component';
import { EMIComponent } from './emi/emi.component';
import { LPIComponent } from './lpi/lpi.component';
import { VisualDimensionalComponent } from './visual-dimensional/visual-dimensional.component';
import { VisualDimensionalMotorComponent } from './visual-dimensional-motor/visual-dimensional-motor.component';
import { MPIComponent } from './mpi/mpi.component';
import { UTAComponent } from './uta/uta.component';


const routes: Routes = [



  //INSPECCION 

  //Proceso-inspeccion
  { path: '', component: ListarInspeccionesComponent },

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

  //INSPECCION 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspeccionEntradaRoutingModule { }
