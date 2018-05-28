import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from "@angular/core";
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs/operators';

@Component({
  selector: 'app-autocompletar',
  templateUrl: './autocompletar.component.html'
})
export class AutocompletarComponent implements OnInit {

  public data: any = { id: 'objId', name: 'objId', clase: 'form-control' };
  public opcion: any;
  public response: any;
  public index: number;
  public dataArray: any = new Array;
  @Input('dataInf') dataInf: any;
  @Output() confir = new EventEmitter();

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public model: any
  constructor() {
  }

  ngOnInit() {
    this.llenarObjectoData(this.dataInf);
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.dataArray[this.opcion].valor.filter(v => v.Valor.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: { Valor: string }) => x.Valor;

  confirmarAction() {
    this.confir.emit(this.response);
  }

  llenarObjectoData(objData: any) {
    console.log(objData);
    if (objData != undefined) {
      this.data.id = (objData.id == undefined) ? "objId" : objData.id;
      this.data.name = (objData.name == undefined) ? "objId" : objData.name;
      this.data.clase = (objData.clase == undefined) ? "form-control" : objData.clase;
      this.opcion = objData.opcion;
      if (objData.data != undefined) {
        this.dataArray = objData.data;
      }
    }
  }

  cambioItemEvent(event) {
    if (event != undefined) {
      this.response = event;
    }
    else
    {
      this.response = undefined;
    }
    this.confirmarAction();
  }
}
