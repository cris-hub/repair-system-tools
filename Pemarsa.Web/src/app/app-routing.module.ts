import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './common/components/home/home.component';


import { ListarClienteComponent } from './cliente/cliente/listar-cliente/listar-cliente.component';
import { ClienteModule } from './cliente/cliente.module';
import { HerramientaModule } from './herramienta/herramienta.module';
import { CrearClienteComponent } from './cliente/cliente/crear-cliente/crear-cliente.component';
import { ListarHerramientaComponent, CrearHerramientaComponent } from './herramienta/herramienta';
import { ListarSolicitudOrdenTrabajoComponent } from './solicitudOrdenTrabajo/solicitudOrdenTrabajo';
import { CrearFormatoComponent } from './formato/crear-formato/crear-formato.component';

const routes: Routes = [

  //Common
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //Cliente
  { path: 'cliente', component: ListarClienteComponent },
  { path: 'cliente/crear', component: CrearClienteComponent },
  { path: 'cliente/editar/:id', component: CrearClienteComponent },
  { path: 'cliente/ver/:id', component: CrearClienteComponent },


  //formato
  { path: 'formato', component: CrearFormatoComponent }
  //Herramienta
  { path: 'herramienta', component: ListarHerramientaComponent },
  { path: 'herramienta/crear', component: CrearHerramientaComponent },
  { path: 'herramienta/editar/:id', component: CrearHerramientaComponent },
  { path: 'herramienta/ver/:id', component: CrearHerramientaComponent },

  //SolicitudOrdenTrabajo
  { path: 'solicitudOrdenTrabajo', component: ListarSolicitudOrdenTrabajoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
