import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent {
  public data: any = {};
  public titulo: string;
  public Mensaje: string;
  public Cancelar: boolean;
  @Output() confir = new EventEmitter();

  constructor() { }
  cancelarAction()
  {
    this.data.response = false;
    this.confir.emit(this.data);
  }
  confirmarAction()
  {
    this.data.response = true;
    this.confir.emit(this.data);
  }

  llenarObjectoData(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.titulo = titulo;
    this.Mensaje = Mensaje;
    this.Cancelar = Cancelar;
    this.data = objData;
  }
}
