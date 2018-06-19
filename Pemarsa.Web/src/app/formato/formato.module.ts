import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CrearFormatoComponent } from './crear-formato/crear-formato.component';
import { UtilModule } from '../common/modules/util.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UtilModule,
    ReactiveFormsModule
  ],
  declarations: [CrearFormatoComponent],
  exports: [
    CrearFormatoComponent
  ]
})
export class FormatoModule { }
