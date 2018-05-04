import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './common/components/home/home.component';
import { LoginComponent } from './common/components/login/login.component';
import { LogoutComponent } from './common/components/logout/logout.component';

//import { AdministradorPlataformaModule } from './administrador-plataforma/administrador-plataforma.module'
//import { AdministradorPlataformaComponent } from './administrador-plataforma/administrador-plataforma/administrador-plataforma.component'
//import { CrearEmpresaComponent } from './administrador-plataforma/empresa/crear-empresa/crear-empresa.component';
//import { ListarEmpresaComponent } from './administrador-plataforma/empresa/listar-empresa/listar-empresa.component';
//import { ConfiguracionComponent } from './administrador-plataforma/configuracion/configuracion/configuracion.component';
//import { ListarFaseComponent } from './administrador-plataforma/configuracion/fases/listar-fase/listar-fase.component';
//import { CrearFaseComponent } from './administrador-plataforma/configuracion/fases/crear-fase/crear-fase.component';
//import { ListarClienteComponent } from './cliente/cliente/listar-cliente/listar-cliente.component';
//import { CrearClienteComponent } from './cliente/cliente/crear-cliente/crear-cliente.component';
//import { VerEmpresaComponent } from './administrador-plataforma/empresa/ver-empresa/ver-empresa.component';

export const routes: Routes = [
  //Common
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  ////Empresas
  //{ path: 'plataforma', component: AdministradorPlataformaComponent},
  //{ path: 'plataforma/empresa', component: ListarEmpresaComponent },
  //{ path: 'plataforma/empresa/crear', component: CrearEmpresaComponent },
  //{ path: 'plataforma/empresa/editar/:id', component: CrearEmpresaComponent },
  //{ path: 'plataforma/empresa/ver/:id', component: VerEmpresaComponent},

  //configuracion
  //{ path: 'plataforma/configuracion', component: ConfiguracionComponent },
  //{ path: 'plataforma/configuracion/fase', component: ListarFaseComponent },
  //{ path: 'plataforma/configuracion/fase/crear', component: CrearFaseComponent },
  //{ path: 'plataforma/configuracion/fase/editar/:id', component: CrearFaseComponent },
  //Cliente
  //{ path: 'cliente', component: ListarClienteComponent },
  //{ path: 'cliente/crear', component: CrearClienteComponent },
  //{ path: 'cliente/editar/:id', component: CrearClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //exports: [RouterModule, AdministradorPlataformaModule]
})
export class AppRoutingModule { }
