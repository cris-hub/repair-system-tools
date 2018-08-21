import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FiltroFormatoModel } from '../../common/models/Index';
import * as $ from 'jquery';

@Component({
  selector: 'app-filtro-formato',
  templateUrl: './filtro-formato.component.html',
  styleUrls: ['./filtro-formato.component.css']
})
export class FiltroFormatoComponent {
  public formularioFormatoFiltro: FormGroup;
  public filtro: FiltroFormatoModel;
  @Input() estadosCatalogo: any;
  @Output() paramsFiltro = new EventEmitter();

  constructor(private frmBuilder: FormBuilder) {
    this.filtro = new FiltroFormatoModel(1, 30);
    this.initForm();
  }

  initForm() {
    console.log(this.filtro)
    this.formularioFormatoFiltro = this.frmBuilder.group({
      Codigo: [this.filtro.Codigo],
      Conexion: [this.filtro.Conexion],
      FormatoAdjunto: [this.filtro.FormatoAdjunto],
      FechaCreacion: [this.filtro.FechaCreacion],
    });
  }
  submitFiltro(filtroGroup: any) {
    debugger;
    this.filtro = <FiltroFormatoModel>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }

  limpiarFormulario() {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation();
    });
    this.formularioFormatoFiltro.reset(new FiltroFormatoModel(1, 30));
    this.filtro = new FiltroFormatoModel(1, 30);

    this.paramsFiltro.emit(this.filtro);
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    if (event.target.tagName == "SELECT") {
      event.stopPropagation();
    }
  }
}
