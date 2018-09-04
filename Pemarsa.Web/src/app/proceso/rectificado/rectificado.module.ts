import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectificadoListarComponent } from './rectificado-listar/rectificado-listar.component';
import { RectificadoProcesarComponent } from './rectificado-procesar/rectificado-procesar.component';
import { RectificadoRoutingModule } from 'src/app/proceso/rectificado/rectificado.routing.module';
import { UtilModule } from 'src/app/common/modules/util.module';

@NgModule({
  imports: [
    CommonModule,
    RectificadoRoutingModule,
    UtilModule
  ],
  declarations: [RectificadoListarComponent, RectificadoProcesarComponent]
})
export class RectificadoModule { }
