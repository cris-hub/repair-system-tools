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

  { path: 'inspeccion/salida/:id/ver', component: InspeccionHerramientaComponent },
  { path: 'inspeccion/salida/:id/:index/ver', component: InspeccionHerramientaComponent },
  //vr
  { path: 'inspeccion/salida/vr/:id/:index/ver', component: VRComponent },
  { path: 'inspeccion/salida/vr/:id/ver', component: VRComponent },

  //ut
  { path: 'inspeccion/salida/ut/:id/:index/ver', component: UTComponent },
  { path: 'inspeccion/salida/ut/:id/ver', component: UTComponent },

  //emi
  { path: 'inspeccion/salida/emi/:id/:indexv', component: EMIComponent },
  { path: 'inspeccion/salida/emi/:id/ver', component: EMIComponent },

  //lpi
  { path: 'inspeccion/salida/lpi/:id/:index/ver', component: LPIComponent },
  { path: 'inspeccion/salida/lpi/:id/ver', component: LPIComponent },

  //visualdimencional
  { path: 'inspeccion/salida/visualdimensional/:id/:index/ver', component: VisualDimensionalComponent },
  { path: 'inspeccion/salida/visualdimensional/:id/ver', component: VisualDimensionalComponent },
  //visualdimencional
  { path: 'inspeccion/salida/visualdimensionalmotor/:id/:index/ver', component: VisualDimensionalMotorComponent },
  { path: 'inspeccion/salida/visualdimensionalmotor/:id/ver', component: VisualDimensionalMotorComponent },


  //mpi
  { path: 'inspeccion/salida/mpi/:id/:index/ver', component: MPIComponent },
  { path: 'inspeccion/salida/mpi/:id/ver', component: MPIComponent },

  //mpi
  { path: 'inspeccion/salida/uta/:id/:index/ver', component: UTAComponent },
  { path: 'inspeccion/salida/uta/:id/ver', component: UTAComponent },






  //PROCERAR 

  { path: 'inspeccion/salida/:id/procesar', component: InspeccionHerramientaComponent },
  { path: 'inspeccion/salida/:id/:index/procesar', component: InspeccionHerramientaComponent },
  //vr
  { path: 'inspeccion/salida/vr/:id/:index/procesar', component: VRComponent },
  { path: 'inspeccion/salida/vr/:id/procesar', component: VRComponent },

  //ut
  { path: 'inspeccion/salida/ut/:id/:index/procesar', component: UTComponent },
  { path: 'inspeccion/salida/ut/:id/procesar', component: UTComponent },

  //emi
  { path: 'inspeccion/salida/emi/:id/:index/procesar', component: EMIComponent },
  { path: 'inspeccion/salida/emi/:id/procesar', component: EMIComponent },

  //lpi
  { path: 'inspeccion/salida/lpi/:id/:index/procesar', component: LPIComponent },
  { path: 'inspeccion/salida/lpi/:id/procesar', component: LPIComponent },

  //visualdimencional
  { path: 'inspeccion/salida/visualdimensional/:id/:index/procesar', component: VisualDimensionalComponent },
  { path: 'inspeccion/salida/visualdimensional/:id/procesar', component: VisualDimensionalComponent },
  //visualdimencional-motor
  { path: 'inspeccion/salida/visualdimensionalmotor/:id/:index/procesar', component: VisualDimensionalMotorComponent },
  { path: 'inspeccion/salida/visualdimensionalmotor/:id/procesar', component: VisualDimensionalMotorComponent },

  //mpi
  { path: 'inspeccion/salida/mpi/:id/:index/procesar', component: MPIComponent },
  { path: 'inspeccion/salida/mpi/:id/procesar', component: MPIComponent },

  //mpi
  { path: 'inspeccion/salida/uta/:id/:index/procesar', component: UTAComponent },
  { path: 'inspeccion/salida/uta/:id/procesar', component: UTAComponent },
  //PROCERAR 


  //Editar 

  { path: 'inspeccion/salida/:id/editar', component: InspeccionHerramientaComponent },
  { path: 'inspeccion/salida/:id/:index/editar', component: InspeccionHerramientaComponent },
  //vr
  { path: 'inspeccion/salida/vr/:id/:index/editar', component: VRComponent },
  { path: 'inspeccion/salida/vr/:id/editar', component: VRComponent },

  //ut
  { path: 'inspeccion/salida/ut/:id/:index/editar', component: UTComponent },
  { path: 'inspeccion/salida/ut/:id/editar', component: UTComponent },

  //emi
  { path: 'inspeccion/salida/emi/:id/:index/editar', component: EMIComponent },
  { path: 'inspeccion/salida/emi/:id/editar', component: EMIComponent },

  //lpi
  { path: 'inspeccion/salida/lpi/:id/:index/editar', component: LPIComponent },
  { path: 'inspeccion/salida/lpi/:id/editar', component: LPIComponent },

  //visualdimencional
  { path: 'inspeccion/salida/visualdimensional/:id/:index/editar', component: VisualDimensionalComponent },
  { path: 'inspeccion/salida/visualdimensional/:id/editar', component: VisualDimensionalComponent },
  //visualdimencional-motor
  { path: 'inspeccion/salida/visualdimensionalmotor/:id/:index/editar', component: VisualDimensionalMotorComponent },
  { path: 'inspeccion/salida/visualdimensionalmotor/:id/editar', component: VisualDimensionalMotorComponent },

  //mpi
  { path: 'inspeccion/salida/mpi/:id/:index/editar', component: MPIComponent },
  { path: 'inspeccion/salida/mpi/:id/editar', component: MPIComponent },

  //mpi
  { path: 'inspeccion/salida/uta/:id/:index/editar', component: UTAComponent },
  { path: 'inspeccion/salida/uta/:id/editar', component: UTAComponent },

  //INSPECCION 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspeccionSalidaRoutingModule { }
