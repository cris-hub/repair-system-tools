import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FiltroHerramientaModel } from "../../../common/models/FiltroModel";
import * as $ from 'jquery';
@Component({
  selector: 'app-filtro-herramienta',
  templateUrl: './filtro-herramienta.component.html'
})
export class FiltroHerramientaComponent {
  public frmFiltroHerramienta: FormGroup;
  public filtro: FiltroHerramientaModel;
  @Output() paramsFiltro = new EventEmitter();

  constructor(private frmBuilder: FormBuilder) {
    this.filtro = new FiltroHerramientaModel(1, 30);
    this.initForm();
  }

  initForm() {
    this.frmFiltroHerramienta = this.frmBuilder.group({
      IdCliente: [''],
      Nombre: [this.filtro.Nombre]
    });
  }

  limpiarFormulario() {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation();
    });
    this.frmFiltroHerramienta.reset(new FiltroHerramientaModel(1, 30));
    this.filtro = new FiltroHerramientaModel(1, 30);
    this.paramsFiltro.emit(this.filtro);
  }

  submitFiltro(filtroGroup: any) {
    this.filtro = <FiltroHerramientaModel>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }
}
