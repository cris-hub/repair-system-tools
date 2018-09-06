import { Component, OnInit, ViewChild, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { EntidadModel } from 'src/app/common/models/EntidadDTOModel';
import { ENTIDADES, GRUPOS } from 'src/app/common/enums/parametrosEnum';
import { ParametroService } from 'src/app/common/services/entity/parametro.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ProcesoModel } from 'src/app/common/models/Index';
import { ProcesoEquipoMedicionModel } from 'src/app/common/models/ProcesoEquipoMedicionModel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ESTADOS_PROCESOS } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-equipo-medicion',
  templateUrl: './equipo-medicion.component.html',
  styleUrls: ['./equipo-medicion.component.css']
})
export class EquipoMedicionComponent implements OnInit {

  ngOnChanges(changes: SimpleChanges): void {
    this.AsignarParametros();
    this.iniciarFormulario();
  }
  //formBuilder: any;

  @ViewChild('instance') instance: NgbTypeahead;
  @Output() formularioEvent = new EventEmitter();
  @Input() public proceso: ProcesoModel;
  @Input() public alistamiento;
  @Input() public disable;
  @Input() public equipomedicion;
  @Input() public equipomedicionMostrar;


  public EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();
  public EquiposMedicionUsadoAdd: EntidadModel[] = new Array<EntidadModel>();
  public EquiposMedicionUsadoView: EntidadModel[] = new Array<EntidadModel>();

  public formularioEquipoMedicion: FormGroup;

  public Bloquear: boolean;

  public validar: boolean = false;
  public validarView: boolean = false;

  constructor(
    private parametroService: ParametroService,
    private formBuilder: FormBuilder) {

  }



  ngOnInit() {
    this.AsignarParametros();
    this.iniciarFormulario();
  }


  iniciarFormulario() {
    this.formularioEquipoMedicion = this.formBuilder.group({
      AplicaEquipoMedicion: [this.proceso.AplicaEquipoMedicion ? this.proceso.AplicaEquipoMedicion : false],
      ProcesoEquipoMedicion: [this.proceso.ProcesoEquipoMedicion ? this.EquiposMedicionUsadoView : null]
    })
  }


  AsignarParametros() {
 
    if (this.equipomedicion != undefined) {
      if (this.equipomedicion.length > 0 && !this.validar) {
        this.EquiposMedicionUsado = this.equipomedicion;
        Object.assign(this.EquiposMedicionUsadoAdd, this.equipomedicion);
        this.validar = true;
      }
    }
    if (this.equipomedicionMostrar != undefined && !this.validarView && this.disable) {
      if (this.equipomedicionMostrar.length > 0) {
        this.validarView = true;
        for (var proces of this.equipomedicionMostrar) {

          this.EquiposMedicionUsadoView.push(<EntidadModel>{
            Id: proces.IdEquipoMedicion ? proces.IdEquipoMedicion : proces.Id,
            Valor: proces.ValorEquipoMedicion ? proces.ValorEquipoMedicion : proces.Valor
          });
        }
      }
    }
  }

  selectItem(event, input) {
    if (!event.item) {
      return
    }

    this.EquiposMedicionUsadoView.push(<EntidadModel>{
      Valor: event.item.Valor,
      Id: event.item.Id
    });
    this.removerDeListaAMostrar(this.EquiposMedicionUsado, event.item)
    event.preventDefault();
    input.value = '';

    this.formularioEquipoMedicion.value.ProcesoEquipoMedicion = this.EquiposMedicionUsadoView;

    this.formularioEvent.emit(this.formularioEquipoMedicion);
  }

  removerDeListaAMostrar(EquiposMedicionUsado: EntidadModel[], objetoEliminar: EntidadModel) {
    let index = EquiposMedicionUsado.findIndex(c => c.Id == objetoEliminar.Id);
    EquiposMedicionUsado.splice(index, 1);
  }

  removerDeElementosSeleccionado(equipo: EntidadModel) {
    debugger;
    let index = this.EquiposMedicionUsadoView.findIndex(c => c.Id == equipo.Id);
    this.EquiposMedicionUsado.push(equipo);
    this.EquiposMedicionUsadoView.splice(index, 1)

    this.formularioEquipoMedicion.value.ProcesoEquipoMedicion = this.EquiposMedicionUsadoView;
    this.iniciarFormulario();
  }


  aplicaEquipo(event: any) {
    var seleccionado: any = event.target.checked;
    if (seleccionado) {
      this.Bloquear = true;
      this.EquiposMedicionUsado = new Array<EntidadModel>();
      this.EquiposMedicionUsadoView = new Array<EntidadModel>();
      this.formularioEquipoMedicion.value.ProcesoEquipoMedicion = this.EquiposMedicionUsadoView;
      this.formularioEvent.emit(this.formularioEquipoMedicion);
    }
    else {
      this.Bloquear = false;
      Object.assign(this.EquiposMedicionUsado, this.EquiposMedicionUsadoAdd);
      this.formularioEvent.emit(this.formularioEquipoMedicion);
    }
  }



  //autocomplete
  //filtrar
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        console.log(term)
        if (term === '_') {

          return this.EquiposMedicionUsado
        } else if (term === '')
          return [];
        else {
          let filtro = this.EquiposMedicionUsado.filter(v => v.Valor.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)

          return filtro && filtro.length != 0 ? filtro : this.EquiposMedicionUsado;
        }

      }));
  ValorFiltrar =
    (x: { Valor: string, x: number }) => x.Valor;
  ValorMostrar =
    (x: { Valor: string, x: number }) => x.Valor;

}
