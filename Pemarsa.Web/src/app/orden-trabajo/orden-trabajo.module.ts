import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarOitComponent } from './listar-oit/listar-oit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UtilModule } from '../common/modules/util.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearOitComponent } from './crear-oit/crear-oit.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    UtilModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  declarations: [ ListarOitComponent, CrearOitComponent]
})
export class OrdenTrabajoModule { }
