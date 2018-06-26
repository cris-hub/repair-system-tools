import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FiltroFormatoModel } from '../../common/models/Index';

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
      HerramientaId: [this.filtro.HerramientaId],
      Conexion: [this.filtro.Conexion],
      TipoConexion: [this.filtro.TipoConexion],
      HerramientaGuid: [this.filtro.HerramientaGuid],
    });
  }
  submitFiltro(filtroGroup: any) {
    this.filtro = <FiltroFormatoModel>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    if (event.target.tagName == "SELECT") {
      event.stopPropagation();
    }
  }
}
