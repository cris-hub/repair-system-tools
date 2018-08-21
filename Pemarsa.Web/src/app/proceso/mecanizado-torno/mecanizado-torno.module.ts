import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarMecanizadoComponent } from './listar-mecanizado/listar-mecanizado.component';
import { ProcesarMecanizadoComponent } from './procesar-mecanizado/procesar-mecanizado.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListarMecanizadoComponent, ProcesarMecanizadoComponent]
})
export class MecanizadoTornoModule { }
