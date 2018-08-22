import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MecanizadoFresaListarComponent } from './mecanizado-fresa-listar/mecanizado-fresa-listar.component';
import { MecanizadoFresaRoutingModule } from 'src/app/proceso/mecanizado-fresa/mecanizado-fresa.routing.module';
import { MecanizadoFresaProcesarComponent } from 'src/app/proceso/mecanizado-fresa/mecanizado-fresa-procesar/mecanizado-fresa-procesar.component';
import { UtilModule } from '../../common/modules/util.module';

@NgModule({
  imports: [
    CommonModule,
    MecanizadoFresaRoutingModule,
    UtilModule,
  ],
  declarations: [
    MecanizadoFresaListarComponent,
    MecanizadoFresaProcesarComponent
  ]
})
export class MecanizadoFresaModule { }
