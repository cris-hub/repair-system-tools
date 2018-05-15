import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { } from '../../../common/models/Index';
import { FiltroModel } from "../../../common/models/FiltroModel";
@Component({
  selector: 'filtro-cliente',
  templateUrl: './filtro-cliente.component.html'
})
export class FiltroClienteComponent {
  public frmFiltroCliente: FormGroup;
  public filtro: FiltroModel;
  @Input() estadosCatalogo: any;
  @Output() paramsFiltro = new EventEmitter();

  constructor(private frmBuilder: FormBuilder) {
    this.filtro = new FiltroModel(1, 30);
    this.initForm();
  }
  consultarClientesPorFiltro() {
    console.log("filtro");
    console.log(this.filtro);
  }

  initForm() {
    this.frmFiltroCliente = this.frmBuilder.group({
      IdCliente: [''],
      RazonSocial: [this.filtro.RazonSocial],
      Nit: [this.filtro.Nit],
      Telefono: [this.filtro.Telefono],
      Direccion: [this.filtro.Direccion],
      Estado: [this.filtro.Estado]
    });
  }
  submitFiltro(filtroGroup: any) {
    this.filtro = <FiltroModel>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }
}
