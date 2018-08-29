import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarMecanizadoComponent } from './listar-mecanizado/listar-mecanizado.component';
import { ProcesarMecanizadoComponent } from './procesar-mecanizado/procesar-mecanizado.component';
import { ProcesarInspeccionDimensionalComponent } from './procesar-inspeccion-dimensional/procesar-inspeccion-dimensional.component';



const routes: Routes = [

  
  { path: '', component: ListarMecanizadoComponent },
  { path: ':id/procesar', component: ProcesarMecanizadoComponent },
  { path: ':id/procesar/inspeccion-dimencional', component: ProcesarInspeccionDimensionalComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanizadoTornoRoutingModule { }
