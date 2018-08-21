import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MecanizadoFresaListarComponent } from 'src/app/proceso/mecanizado-fresa/mecanizado-fresa-listar/mecanizado-fresa-listar.component';

const routes: Routes = [

  //Listar Fresado
  { path: '', component: MecanizadoFresaListarComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MecanizadoFresaRoutingModule { }
