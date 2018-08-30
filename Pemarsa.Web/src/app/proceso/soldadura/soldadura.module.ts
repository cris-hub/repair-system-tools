import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoldaduraListarComponent } from './soldadura-listar/soldadura-listar.component';
import { SoldaduraRoutingModule } from 'src/app/proceso/soldadura/soldadura.routing.module';
import { ProcesoModule } from 'src/app/proceso/proceso.module';
import { CoordinadorModule } from 'src/app/proceso/coordinador/coordinador.module';
import { UtilModule } from 'src/app/common/modules/util.module';

@NgModule({
  imports: [
    CommonModule,
    SoldaduraRoutingModule,
    ProcesoModule,
    CoordinadorModule,
    UtilModule,
  ],
  declarations: [SoldaduraListarComponent]
})
export class SoldaduraModule { }
