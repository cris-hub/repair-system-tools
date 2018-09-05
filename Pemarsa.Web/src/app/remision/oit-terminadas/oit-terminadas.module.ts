import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OitTerminadasListarComponent } from 'src/app/remision/oit-terminadas/oit-terminadas-listar/oit-terminadas-listar.component';
import { OitTerminadasRoutingModule } from 'src/app/remision/oit-terminadas/oit-terminadad.routing.module';
import { UtilModule } from 'src/app/common/modules/util.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FiltroOitTerminadasComponent } from 'src/app/remision/oit-terminadas/filtro-oit-terminadas/filtro-oit-terminadas.component';

@NgModule({
  imports: [
    CommonModule,
    OitTerminadasRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    UtilModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [OitTerminadasListarComponent, FiltroOitTerminadasComponent]
})
export class OitTerminadasModule { }
