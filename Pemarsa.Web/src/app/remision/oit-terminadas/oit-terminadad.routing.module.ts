import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OitTerminadasListarComponent } from 'src/app/remision/oit-terminadas/oit-terminadas-listar/oit-terminadas-listar.component';

const routes: Routes = [

  { path: '', component: OitTerminadasListarComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OitTerminadasRoutingModule { }
