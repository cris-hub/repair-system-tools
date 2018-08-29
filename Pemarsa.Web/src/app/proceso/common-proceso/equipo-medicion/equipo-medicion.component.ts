import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { EntidadModel } from 'src/app/common/models/EntidadDTOModel';
import { ENTIDADES, GRUPOS } from 'src/app/common/enums/parametrosEnum';
import { ParametroService } from 'src/app/common/services/entity/parametro.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ProcesoModel } from 'src/app/common/models/Index';
import { ProcesoEquipoMedicionModel } from 'src/app/common/models/ProcesoEquipoMedicionModel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-equipo-medicion',
  templateUrl: './equipo-medicion.component.html',
  styleUrls: ['./equipo-medicion.component.css']
})
export class EquipoMedicionComponent implements OnInit {

  @ViewChild('instance') instance: NgbTypeahead;
  @Input() public proceso: ProcesoModel;


  public EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();
  public EquiposMedicionUsadoAdd: EntidadModel[] = new Array<EntidadModel>();
  public ProcesoEquipoMedicion: ProcesoEquipoMedicionModel[] = new Array<ProcesoEquipoMedicionModel>(); // = new ProcesoEquipoMedicionModel();

  public formularioEquipoMedicion: FormGroup

  constructor(
    private parametroService: ParametroService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {


    this.ngOnInit()
  }

  ngOnInit() {
    this.consultarParametros();
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
  
    this.ProcesoEquipoMedicion.push(<ProcesoEquipoMedicionModel>{
      ValorEquipoMedicion: event.item.Valor,
      IdEquipoMedicion: event.item.Id,
      ProcesoId: this.proceso ? this.proceso.Id : null 
    });
    this.removerDeListaAMostrar(this.EquiposMedicionUsado, event.item)
    event.preventDefault();
    input.value = '';
  }

  removerDeListaAMostrar(EquiposMedicionUsado: EntidadModel[], objetoEliminar: EntidadModel) {
    let index = EquiposMedicionUsado.findIndex(c => c.Id == objetoEliminar.Id);
    EquiposMedicionUsado.splice(index, 1);
  }

  removerDeElementosSeleccionado(equipo) {
    debugger;
    let index = this.ProcesoEquipoMedicion.findIndex(c => c.IdEquipoMedicion == equipo.IdEquipoMedicion);
    this.ProcesoEquipoMedicion.splice(index, 1)

    let procesoE = this.EquiposMedicionUsadoAdd.find(e => e.Id == equipo.IdEquipoMedicion);

    this.EquiposMedicionUsado.push(procesoE);
    //this.añadirAlistaMostrar(this.EquiposMedicionUsado, equipo)
  }
  //añadirAlistaMostrar(EquiposMedicionUsado: EntidadModel[], objetoAñadir: EntidadModel) {
  //  EquiposMedicionUsado.push(objetoAñadir);
  //}



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
