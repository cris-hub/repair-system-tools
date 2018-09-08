import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RemisionPendienteFiltroDTO } from 'src/app/common/models/FiltroModel';
import * as $ from 'jquery';

@Component({
  selector: 'app-filtro-remisiones',
  templateUrl: './filtro-remisiones.component.html',
  styleUrls: ['./filtro-remisiones.component.css']
})
export class FiltroRemisionesComponent{

  public formulario: FormGroup;
  public filtro: RemisionPendienteFiltroDTO;
  @Output() paramsFiltro = new EventEmitter();

  constructor(private frmBuilder: FormBuilder) {
    this.filtro = new RemisionPendienteFiltroDTO(1, 30);
    this.initForm();
  }

  initForm() {
    this.formulario = this.frmBuilder.group({
      RemisionId: [this.filtro.RemisionId],
      OrdenTrabajoId: [this.filtro.OrdenTrabajoId],
      Cliente: [this.filtro.Cliente],
      Linea: [this.filtro.Linea],
      Herramienta: [this.filtro.Herramienta],
      Serial: [this.filtro.Serial],
      DetalleSolicitud: [this.filtro.DetalleSolicitud]
    });
  }

  submitFiltro(filtroGroup: any) {
    this.filtro = <RemisionPendienteFiltroDTO>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }


  limpiarFormulario() {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation();
    });
    this.formulario.reset(new RemisionPendienteFiltroDTO(1, 30));
    this.filtro = new RemisionPendienteFiltroDTO(1, 30);

    this.paramsFiltro.emit(this.filtro);
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    if (event.target.tagName == "SELECT") {
      event.stopPropagation();
    }
  }

}
