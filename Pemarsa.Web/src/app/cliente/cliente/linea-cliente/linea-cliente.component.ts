import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ClienteLineaModel } from "../../../common/models/ClienteLineaModel";

@Component({
  selector: 'app-liena-cliente',
  templateUrl: './linea-cliente.component.html'
})
export class LineaClienteComponent {
  public frmLineaCliente: FormGroup;
  public lineaCliente: ClienteLineaModel;
  @Input() ClienteLinea: ClienteLineaModel;
  @Input() accion: any;
  @Output() paramsLineaCliente = new EventEmitter();
  constructor(private frmBuilder: FormBuilder) {
    this.lineaCliente = new ClienteLineaModel();
    this.initForm();
  }

  initForm() {
    this.frmLineaCliente = this.frmBuilder.group({
      Id: [this.lineaCliente.Id],
      ContactoCorreo: [this.lineaCliente.ContactoCorreo],
      ContactoNombre: [this.lineaCliente.ContactoNombre],
      ContactoTelefono: [this.lineaCliente.ContactoTelefono],
      Direccion: [this.lineaCliente.Direccion],
      Nombre: [this.lineaCliente.Nombre],
      ClienteId: [this.lineaCliente.ClienteId]
    });
  }
  submitlineaCliente(lineaClienteGroup: any) {
    this.lineaCliente = <ClienteLineaModel>lineaClienteGroup;
    this.paramsLineaCliente.emit(this.lineaCliente);
  }

  limpiarlineaCliente() {
    this.initForm();
  }
}
