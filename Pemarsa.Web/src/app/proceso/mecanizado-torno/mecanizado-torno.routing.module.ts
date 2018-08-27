import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarMecanizadoComponent } from './listar-mecanizado/listar-mecanizado.component';
import { ProcesarMecanizadoComponent } from './procesar-mecanizado/procesar-mecanizado.component';



const routes: Routes = [

  
  { path: '', component: ListarMecanizadoComponent },
  { path: ':id/procesar', component: ProcesarMecanizadoComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanizadoTornoRoutingModule { }
