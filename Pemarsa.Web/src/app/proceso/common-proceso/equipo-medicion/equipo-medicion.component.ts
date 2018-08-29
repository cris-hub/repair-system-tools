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
    this.ngOnInit()
  }
  //formBuilder: any;

  @ViewChild('instance') instance: NgbTypeahead;
  @Output() formularioEvent = new EventEmitter();
  @Input() public proceso: ProcesoModel;
  @Input() public alistamiento;
  @Input() public disable;


  public EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();
  public EquiposMedicionUsadoAdd: EntidadModel[] = new Array<EntidadModel>();
  public ProcesoEquipoMedicion: ProcesoEquipoMedicionModel[] = new Array<ProcesoEquipoMedicionModel>(); // = new ProcesoEquipoMedicionModel();

  public formularioEquipoMedicion: FormGroup;

  //public disable: boolean;
  public Bloquear: boolean;

  constructor(
    private parametroService: ParametroService,
    private formBuilder: FormBuilder) { }



  ngOnInit() {
    this.consultarParametros();
    this.iniciarFormulario(this.proceso);
    //this.validacionesFormulario();
  }


  iniciarFormulario(proceso: ProcesoModel) {

      //EstadoId: [this.proceso.EstadoId],
    this.formularioEquipoMedicion = this.formBuilder.group({
      AplicaEquipoMedicion: [this.proceso.AplicaEquipoMedicion ? this.proceso.AplicaEquipoMedicion : false],
      ProcesoEquipoMedicion: [this.proceso.ProcesoEquipoMedicion]
    })
    this.formularioEvent.emit(this.formularioEquipoMedicion);

    this.formularioEquipoMedicion.valueChanges.subscribe(value => {
      console.log(value)
      this.formularioEvent.emit(this.formularioEquipoMedicion);

    })

  }


  consultarParametros() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
      this.EquiposMedicionUsadoAdd = response.Consultas.filter(equpo => equpo.Grupo == GRUPOS.EQUIPOMEDICIONUTILIZADO);
      this.EquiposMedicionUsado = response.Consultas.filter(equpo => equpo.Grupo == GRUPOS.EQUIPOMEDICIONUTILIZADO);

    })
  }

  selectItem(event, input) {
    if (!event.item) {
      return
    }

    this.proceso.ProcesoEquipoMedicion.push(<ProcesoEquipoMedicionModel>{
      ValorEquipoMedicion: event.item.Valor,
      IdEquipoMedicion: event.item.Id,
      ProcesoId: this.proceso ? this.proceso.Id : null
    });
    this.removerDeListaAMostrar(this.EquiposMedicionUsado, event.item)
    event.preventDefault();
    input.value = '';

    this.formularioEquipoMedicion.value.ProcesoEquipoMedicion = this.proceso.ProcesoEquipoMedicion;
    Object.assign(this.proceso, this.formularioEquipoMedicion.value);
    this.iniciarFormulario(this.proceso);
  }

  removerDeListaAMostrar(EquiposMedicionUsado: EntidadModel[], objetoEliminar: EntidadModel) {
    let index = EquiposMedicionUsado.findIndex(c => c.Id == objetoEliminar.Id);
    EquiposMedicionUsado.splice(index, 1);
  }

  removerDeElementosSeleccionado(equipo) {
    debugger;
    let index = this.proceso.ProcesoEquipoMedicion.findIndex(c => c.IdEquipoMedicion == equipo.IdEquipoMedicion);
    this.proceso.ProcesoEquipoMedicion.splice(index, 1)

    let procesoE = this.EquiposMedicionUsadoAdd.find(e => e.Id == equipo.IdEquipoMedicion);

    this.EquiposMedicionUsado.push(procesoE);
    this.formularioEquipoMedicion.value.ProcesoEquipoMedicion = this.proceso.ProcesoEquipoMedicion;
    Object.assign(this.proceso, this.formularioEquipoMedicion.value);
    this.iniciarFormulario(this.proceso);
  }


  aplicaEquipo(event: any) {
    var seleccionado: any = event.target.checked;
    if (seleccionado) {
      this.Bloquear = true;
      this.EquiposMedicionUsado = new Array<EntidadModel>();
      this.proceso.ProcesoEquipoMedicion = new Array<ProcesoEquipoMedicionModel>();
      this.formularioEquipoMedicion.value.ProcesoEquipoMedicion = this.proceso.ProcesoEquipoMedicion;
      Object.assign(this.proceso, this.formularioEquipoMedicion.value);
      this.iniciarFormulario(this.proceso);
    }
    else {
      this.Bloquear = false;
      Object.assign(this.EquiposMedicionUsado, this.EquiposMedicionUsadoAdd);
      //this.EquiposMedicionUsado = this.EquiposMedicionUsadoAdd;
    }
  }

  validacionesFormulario() {
    this.disable = true;
    if (this.proceso.Id) {
      if (this.proceso.EstadoId == ESTADOS_PROCESOS.Asignado) {

        this.formularioEquipoMedicion.setValidators(Validators.required)
        this.formularioEquipoMedicion.setErrors({ 'requerido': true })
        this.formularioEquipoMedicion.get('EstadoId').setValue(ESTADOS_PROCESOS.Completado);
        this.disable = false;


      } else if ((this.proceso.EstadoId != ESTADOS_PROCESOS.Asignado)) {

        this.formularioEquipoMedicion.setValidators(null)
        this.formularioEquipoMedicion.setErrors(null)
        delete this.formularioEquipoMedicion.controls['EstadoId']
        this.disable = true;
      }

    }


    this.formularioEquipoMedicion.updateValueAndValidity();
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
