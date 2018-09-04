import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RectificadoListarComponent } from 'src/app/proceso/rectificado/rectificado-listar/rectificado-listar.component';
import { RectificadoProcesarComponent } from 'src/app/proceso/rectificado/rectificado-procesar/rectificado-procesar.component';

const routes: Routes = [

  { path: '', component: RectificadoListarComponent },
  { path: 'procesar/:id', component: RectificadoProcesarComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RectificadoRoutingModule { }
