import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'confirmacion-modal',
  templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent {
  @Input() titulo: string;
  @Input() Mensaje: string;
  @Output() confir = new EventEmitter();

  constructor() { }

  confirmar()
  {
    this.confir.emit(true);
  }
}
