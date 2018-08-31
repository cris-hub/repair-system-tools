import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoldaduraListarComponent } from 'src/app/proceso/soldadura/soldadura-listar/soldadura-listar.component';
import { SoldaduraProcesarComponent } from 'src/app/proceso/soldadura/soldadura-procesar/soldadura-procesar.component';

const routes: Routes = [

  { path: '', component: SoldaduraListarComponent },
  { path: 'procesar/:id', component: SoldaduraProcesarComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoldaduraRoutingModule { }
