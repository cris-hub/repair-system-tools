import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FiltroOrdenTrabajoParaRemision } from 'src/app/common/models/FiltroModel';
import * as $ from 'jquery';

@Component({
  selector: 'app-filtro-oit-terminadas',
  templateUrl: './filtro-oit-terminadas.component.html',
  styleUrls: ['./filtro-oit-terminadas.component.css']
})
export class FiltroOitTerminadasComponent{

  public formulario: FormGroup;
  public filtro: FiltroOrdenTrabajoParaRemision;
  @Output() paramsFiltro = new EventEmitter();

  constructor(private frmBuilder: FormBuilder) {
    this.filtro = new FiltroOrdenTrabajoParaRemision(1, 30);
    this.initForm();
  }

  initForm() {
    this.formulario = this.frmBuilder.group({
      Id: [this.filtro.Id],
      Cliente: [this.filtro.Cliente],
      Linea: [this.filtro.Linea],
      Herramienta: [this.filtro.Herramienta],
      Fecha: [this.filtro.Fecha]
    });
  }

  submitFiltro(filtroGroup: any) {
    this.filtro = <FiltroOrdenTrabajoParaRemision>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }


  limpiarFormulario() {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation();
    });
    this.formulario.reset(new FiltroOrdenTrabajoParaRemision(1, 30));
    this.filtro = new FiltroOrdenTrabajoParaRemision(1, 30);

    this.paramsFiltro.emit(this.filtro);
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    if (event.target.tagName == "SELECT") {
      event.stopPropagation();
    }
  }

}
