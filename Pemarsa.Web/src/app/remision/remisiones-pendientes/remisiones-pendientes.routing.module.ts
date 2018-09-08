import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemisionesListarComponent } from 'src/app/remision/remisiones-pendientes/remisiones-listar/remisiones-listar.component';


const routes: Routes = [

  { path: '', component: RemisionesListarComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemisionesPendientesRoutingModule { }
