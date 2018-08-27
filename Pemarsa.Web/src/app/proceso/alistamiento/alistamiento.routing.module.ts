import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlistamientoListarComponent } from 'src/app/proceso/alistamiento/alistamiento-listar/alistamiento-listar.component';
import { AlistamientoProcesarComponent } from 'src/app/proceso/alistamiento/alistamiento-procesar/alistamiento-procesar.component';

const routes: Routes = [

  //Listar alistamiento
  { path: '', component: AlistamientoListarComponent },
  { path: 'procesar/:id', component: AlistamientoProcesarComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlistamientoRoutingModule { }
