import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MecanizadoFresaListarComponent } from 'src/app/proceso/mecanizado-fresa/mecanizado-fresa-listar/mecanizado-fresa-listar.component';
import { MecanizadoFresaProcesarComponent } from 'src/app/proceso/mecanizado-fresa/mecanizado-fresa-procesar/mecanizado-fresa-procesar.component';

const routes: Routes = [

  //Listar Fresado
  { path: '', component: MecanizadoFresaListarComponent },
  { path: 'procesar/:id', component: MecanizadoFresaProcesarComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanizadoFresaRoutingModule { }
