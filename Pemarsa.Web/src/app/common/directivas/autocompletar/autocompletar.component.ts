import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from "@angular/core";
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs/operators';



@Component({
  selector: 'app-autocompletar',
  templateUrl: './autocompletar.component.html'
})
export class AutocompletarComponent {

  @Input() modelo: any;
  @Input() objetosDondeBuscar: Array<any>;
  @Input() propiedadFiltrar: string;
  @Input() propiedadMostrar: string;

  private objetosFiltrados: Array<any> = new Array();
  public data: any = {};


  @Output() filtro = new EventEmitter();


  filtrarObejetos(event) {
    this.objetosFiltrados = new Array<any>();
    for (let i = 0; i < this.objetosDondeBuscar.length; i++) {
      let objeto = this.objetosDondeBuscar[i];
      console.log(objeto[this.propiedadFiltrar])
      // if (objeto.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
      //   this.objetosFiltrado.push(objeto);
      // }
    }
  }

  confirmarAction() {
    this.data.objetos = this.objetosFiltrados
    this.data.seleccionado = this.modelo
    this.filtro.emit(this.data);
  }


}
