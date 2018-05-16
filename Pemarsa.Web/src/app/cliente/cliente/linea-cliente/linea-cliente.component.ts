import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ClienteLineaModel } from "../../../common/models/ClienteLineaModel";

@Component({
  selector: 'app-liena-cliente',
  templateUrl: './linea-cliente.component.html'
})
export class LineaClienteComponent {
  public data: any = {};
  public frmLineaCliente: FormGroup;
  private lineaCliente: ClienteLineaModel;
  @Input() ClienteLinea: ClienteLineaModel;
  @Input() accion: any; 
  @Output() paramsLineaCliente = new EventEmitter();
  constructor(private frmBuilder: FormBuilder) {
    this.lineaCliente = new ClienteLineaModel();
    this.initForm();
  }

  llenarObjectoCliente(ClienteLineaObj: ClienteLineaModel, accion: any, index: any) {
    console.log(ClienteLineaObj);
    this.lineaCliente.Id = ClienteLineaObj.Id;
    this.lineaCliente.ContactoCorreo = ClienteLineaObj.ContactoCorreo;
    this.lineaCliente.ContactoNombre = ClienteLineaObj.ContactoNombre;
    this.lineaCliente.ContactoTelefono = ClienteLineaObj.ContactoTelefono;
    this.lineaCliente.Direccion = ClienteLineaObj.Direccion;
    this.lineaCliente.Nombre = ClienteLineaObj.Nombre;
    this.lineaCliente.ClienteId = ClienteLineaObj.ClienteId;
    this.accion = accion;
    this.data.index = index;
    this.initForm();

  }
  nuevoDataLineaCliente(accion: any) {
    this.lineaCliente = new ClienteLineaModel();
    this.accion = accion;
    this.initForm();
  }
  initForm() {
    console.log(this.lineaCliente);
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
    this.data.lineaCliente = this.lineaCliente;
    this.data.accion = this.accion;
    this.paramsLineaCliente.emit(this.data);
  }

  limpiarlineaCliente() {
    this.lineaCliente = new ClienteLineaModel();
    this.initForm();
  }
}
