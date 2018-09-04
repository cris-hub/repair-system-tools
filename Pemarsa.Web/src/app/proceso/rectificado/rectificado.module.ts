import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectificadoListarComponent } from './rectificado-listar/rectificado-listar.component';
import { RectificadoProcesarComponent } from './rectificado-procesar/rectificado-procesar.component';
import { RectificadoRoutingModule } from 'src/app/proceso/rectificado/rectificado.routing.module';
import { UtilModule } from 'src/app/common/modules/util.module';
import { ProcesoModule } from 'src/app/proceso/proceso.module';

@NgModule({
  imports: [
    CommonModule,
    RectificadoRoutingModule,
    UtilModule,
    ProcesoModule
  ],
  declarations: [RectificadoListarComponent, RectificadoProcesarComponent]
})
export class RectificadoModule { }
