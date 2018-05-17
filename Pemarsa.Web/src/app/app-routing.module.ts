import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './common/components/home/home.component';


import { ListarClienteComponent } from './cliente/cliente/listar-cliente/listar-cliente.component';
import { ClienteModule } from './cliente/cliente.module';
import { CrearClienteComponent } from './cliente/cliente/crear-cliente/crear-cliente.component';

const routes: Routes = [

  //Common
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
   //Cliente
  { path: 'cliente', component: ListarClienteComponent },
  { path: 'cliente/crear', component: CrearClienteComponent },
  { path: 'cliente/editar/:id', component: CrearClienteComponent },
  { path: 'cliente/ver/:id', component: CrearClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
