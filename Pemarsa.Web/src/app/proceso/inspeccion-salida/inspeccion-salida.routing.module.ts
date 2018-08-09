import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarInspeccionesSalidaComponent } from './listar-inspecciones/listar-inspecciones.component';
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
  { path: '', component: ListarInspeccionesSalidaComponent },

  { path: ':id/ver', component: InspeccionHerramientaComponent },
  { path: ':id/:index/ver', component: InspeccionHerramientaComponent },
  //vr
  { path: 'vr/:id/:index/ver', component: VRComponent },
  { path: 'vr/:id/ver', component: VRComponent },

  //ut
  { path: 'ut/:id/:index/ver', component: UTComponent },
  { path: 'ut/:id/ver', component: UTComponent },

  //emi
  { path: 'emi/:id/:indexv', component: EMIComponent },
  { path: 'emi/:id/ver', component: EMIComponent },

  //lpi
  { path: 'lpi/:id/:index/ver', component: LPIComponent },
  { path: 'lpi/:id/ver', component: LPIComponent },

  //visualdimencional
  { path: 'visualdimensional/:id/:index/ver', component: VisualDimensionalComponent },
  { path: 'visualdimensional/:id/ver', component: VisualDimensionalComponent },
  //visualdimencional
  { path: 'visualdimensionalmotor/:id/:index/ver', component: VisualDimensionalMotorComponent },
  { path: 'visualdimensionalmotor/:id/ver', component: VisualDimensionalMotorComponent },


  //mpi
  { path: 'mpi/:id/:index/ver', component: MPIComponent },
  { path: 'mpi/:id/ver', component: MPIComponent },

  //mpi
  { path: 'uta/:id/:index/ver', component: UTAComponent },
  { path: 'uta/:id/ver', component: UTAComponent },






  //PROCERAR 

  { path: ':id/procesar', component: InspeccionHerramientaComponent },
  { path: ':id/:index/procesar', component: InspeccionHerramientaComponent },
  //vr
  { path: 'vr/:id/:index/procesar', component: VRComponent },
  { path: 'vr/:id/procesar', component: VRComponent },

  //ut
  { path: 'ut/:id/:index/procesar', component: UTComponent },
  { path: 'ut/:id/procesar', component: UTComponent },

  //emi
  { path: 'emi/:id/:index/procesar', component: EMIComponent },
  { path: 'emi/:id/procesar', component: EMIComponent },

  //lpi
  { path: 'lpi/:id/:index/procesar', component: LPIComponent },
  { path: 'lpi/:id/procesar', component: LPIComponent },

  //visualdimencional
  { path: 'visualdimensional/:id/:index/procesar', component: VisualDimensionalComponent },
  { path: 'visualdimensional/:id/procesar', component: VisualDimensionalComponent },
  //visualdimencional-motor
  { path: 'visualdimensionalmotor/:id/:index/procesar', component: VisualDimensionalMotorComponent },
  { path: 'visualdimensionalmotor/:id/procesar', component: VisualDimensionalMotorComponent },

  //mpi
  { path: 'mpi/:id/:index/procesar', component: MPIComponent },
  { path: 'mpi/:id/procesar', component: MPIComponent },

  //mpi
  { path: 'uta/:id/:index/procesar', component: UTAComponent },
  { path: 'uta/:id/procesar', component: UTAComponent },
  //PROCERAR 


  //Editar 

  { path: ':id/editar', component: InspeccionHerramientaComponent },
  { path: ':id/:index/editar', component: InspeccionHerramientaComponent },
  //vr
  { path: 'vr/:id/:index/editar', component: VRComponent },
  { path: 'vr/:id/editar', component: VRComponent },

  //ut
  { path: 'ut/:id/:index/editar', component: UTComponent },
  { path: 'ut/:id/editar', component: UTComponent },

  //emi
  { path: 'emi/:id/:index/editar', component: EMIComponent },
  { path: 'emi/:id/editar', component: EMIComponent },

  //lpi
  { path: 'lpi/:id/:index/editar', component: LPIComponent },
  { path: 'lpi/:id/editar', component: LPIComponent },

  //visualdimencional
  { path: 'visualdimensional/:id/:index/editar', component: VisualDimensionalComponent },
  { path: 'visualdimensional/:id/editar', component: VisualDimensionalComponent },
  //visualdimencional-motor
  { path: 'visualdimensionalmotor/:id/:index/editar', component: VisualDimensionalMotorComponent },
  { path: 'visualdimensionalmotor/:id/editar', component: VisualDimensionalMotorComponent },

  //mpi
  { path: 'mpi/:id/:index/editar', component: MPIComponent },
  { path: 'mpi/:id/editar', component: MPIComponent },

  //mpi
  { path: 'uta/:id/:index/editar', component: UTAComponent },
  { path: 'uta/:id/editar', component: UTAComponent },

  //INSPECCION 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspeccionSalidaRoutingModule { }
