import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoldaduraListarComponent } from 'src/app/proceso/soldadura/soldadura-listar/soldadura-listar.component';

const routes: Routes = [

  //Listar alistamiento
  { path: '', component: SoldaduraListarComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoldaduraRoutingModule { }
