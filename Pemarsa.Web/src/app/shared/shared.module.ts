import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidatorComponent } from './validator/validator.component';
import { AlertsComponent } from './alerts/alerts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../common/modules/material.module';
import { RouterModule } from '@angular/router';
import { ConfirmarAccionComponent } from './confirmar-accion/confirmar-accion.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    ValidatorComponent,
    AlertsComponent,
    NavbarComponent,
    MenuComponent,
    ConfirmarAccionComponent,
  ],
  exports: [
    ValidatorComponent,
    AlertsComponent,
    NavbarComponent,
    MenuComponent
  ],
  entryComponents: [AlertsComponent]
})
export class SharedModule { }
