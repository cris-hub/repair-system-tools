import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlistamientoListarComponent } from './alistamiento-listar/alistamiento-listar.component';
import { AlistamientoProcesarComponent } from './alistamiento-procesar/alistamiento-procesar.component';
import { AlistamientoRoutingModule } from 'src/app/proceso/alistamiento/alistamiento.routing.module';
import { ProcesoModule } from 'src/app/proceso/proceso.module';
import { CoordinadorModule } from 'src/app/proceso/coordinador/coordinador.module';
import { UtilModule } from 'src/app/common/modules/util.module';

@NgModule({
  imports: [
    CommonModule,
    AlistamientoRoutingModule,
    ProcesoModule,
    CoordinadorModule,
    UtilModule,
  ],
  declarations: [AlistamientoListarComponent, AlistamientoProcesarComponent]
})
export class AlistamientoModule { }
