import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProcesoModel, ParametrosModel } from 'src/app/common/models/Index';

@Component({
  selector: 'app-form-trazabilidad',
  templateUrl: './form-trazabilidad.component.html',
  styleUrls: ['./form-trazabilidad.component.css']
})
export class FormTrazabilidadComponent implements OnInit {

  ngOnChanges(changes: SimpleChanges): void {
    //this.iniciarformularioSoldadura();
  }


  @Output() formularioEvent = new EventEmitter();
  @Input() public proceso: ProcesoModel
  @Input() public tiposoldadura
  @Input() public parametros: ParametrosModel

  formularioTrazabilidadProceso: FormGroup

  constructor() { }

  ngOnInit() {
  }


  iniciarformularioSoldadura(formularioTrazabilidadProceso: FormGroup) {
    this.formularioTrazabilidadProceso = formularioTrazabilidadProceso;
    this.formularioEvent.emit(this.formularioTrazabilidadProceso);
  }
}
