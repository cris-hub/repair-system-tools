import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MecanizadoFresaListarComponent } from './mecanizado-fresa-listar/mecanizado-fresa-listar.component';
import { MecanizadoFresaRoutingModule } from 'src/app/proceso/mecanizado-fresa/mecanizado-fresa.routing.module';

@NgModule({
  imports: [
    CommonModule,
    MecanizadoFresaRoutingModule
  ],
  declarations: [MecanizadoFresaListarComponent]
})
export class MecanizadoFresaModule { }
