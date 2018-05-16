import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ClienteLineaModel } from "../../../common/models/ClienteLineaModel";

@Component({
  selector: 'app-liena-cliente',
  templateUrl: './linea-cliente.component.html'
})
export class LineaClienteComponent implements OnInit {
  
  public frmLineaCliente: FormGroup;
  public lineaCliente: ClienteLineaModel;
  @Input() ClienteLinea: ClienteLineaModel;
  @Input() accion: any; 
  @Input() nameModal: any;
  @Output() paramsLineaCliente = new EventEmitter();
  constructor(private frmBuilder: FormBuilder) {
    this.lineaCliente = new ClienteLineaModel();
    this.initForm();
  }

  ngOnInit(): void {
  }

  llenarObjectoCliente(ClienteLineaObj: ClienteLineaModel) {
    this.lineaCliente.Id = ClienteLineaObj.Id;
    this.lineaCliente.ContactoCorreo = ClienteLineaObj.ContactoCorreo;
    this.lineaCliente.ContactoNombre = ClienteLineaObj.ContactoNombre;
    this.lineaCliente.ContactoTelefono = ClienteLineaObj.ContactoTelefono;
    this.lineaCliente.Direccion = ClienteLineaObj.Direccion;
    this.lineaCliente.Nombre = ClienteLineaObj.Nombre;
    this.lineaCliente.ClienteId = ClienteLineaObj.ClienteId;
    this.nameModal = "LineaClienteModalVer";
    this.accion = "ver";
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
