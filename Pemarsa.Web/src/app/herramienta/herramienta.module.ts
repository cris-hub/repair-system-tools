import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { UtilModule } from '../common/modules/util.module';
import {
  ListarHerramientaComponent,
  FiltroHerramientaComponent,
  FactibilidadHerramientaComponent,
  CrearHerramientaComponent
} from './herramienta/index'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoCompletarComponent } from './herramienta/auto-completar/auto-completar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    Ng2SearchPipeModule,
    
  ],
  declarations: [
    ListarHerramientaComponent,
    FiltroHerramientaComponent,
    FactibilidadHerramientaComponent,
    CrearHerramientaComponent,
    AutoCompletarComponent
  ],
  exports: [
    ListarHerramientaComponent
  ],
  entryComponents: []
})
export class HerramientaModule { }
