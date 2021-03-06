import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TIPO_INSPECCION, ALERTAS_ERROR_MENSAJE, ALERTAS_ERROR_TITULO, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ESTADOS_PROCESOS, TIPOS_CONEXION, CONEXION, ALERTAS_INFO_MENSAJE } from '../../inspeccion-enum/inspeccion.enum';

import { ToastrService } from 'ngx-toastr';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { EntidadModel } from '../../../common/models/EntidadDTOModel';
import { InspeccionConexionModel } from '../../../common/models/InspeccionConexionModel';


@Component({
  selector: 'app-conexion-inspeccion',
  templateUrl: './conexion-inspeccion.component.html',
  styleUrls: ['./conexion-inspeccion.component.css']
})
export class ConexionInspeccionComponent implements OnInit,OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['conexiones']) {
      this.iniciarFormulario()

    }

  }
  public formInpeccionVisualDimensional: FormGroup
  public formConexiones: any
  @Input() public disable: boolean
  @Input() public conexiones: InspeccionConexionModel[] = []
  @Output() public  conexionesOut = new EventEmitter()

  //catalogos
  public Conexiones: EntidadModel[] = new Array<EntidadModel>();
  public Conexion: EntidadModel = new EntidadModel();
  public EstadosConexion: EntidadModel[] = new Array<EntidadModel>();
  public TiposConexion: EntidadModel[] = new Array<EntidadModel>();
  public EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();
  
  constructor(
    private formBuider: FormBuilder,
    private toastrService: ToastrService,
    private parametroService: ParametroService,
  ) { }

  ngOnInit() {
    this.consultarParatros();
    
  }

  iniciarFormulario() {
    this.formInpeccionVisualDimensional = this.formBuider.group({
      Conexiones: this.formBuider.array([])
    });
    this.crearFormConexiones()
    this.formInpeccionVisualDimensional.get('Conexiones').valueChanges.subscribe(change => {
      console.log(this.formInpeccionVisualDimensional.get('Conexiones').value)
      this.conexionesOut.emit(this.formInpeccionVisualDimensional.get('Conexiones'));
    })
    if (this.disable) {
      this.formInpeccionVisualDimensional.disable()
    }
  }


  crearFormConexiones(): any {

    if (!this.formInpeccionVisualDimensional) {
      return
    }

    this.formConexiones = this.formInpeccionVisualDimensional.get('Conexiones') as FormArray;
    

    if (!this.conexiones) {
      this.conexiones = []
    }
    while (this.conexiones.length < 3) {
      this.conexiones.push(new InspeccionConexionModel())

    }



    this.conexiones.forEach((p, i) => {

      let posicion = this.formConexiones.controls ? this.formConexiones.controls.length : 0

      let form = this.formBuider.group({});
      form.addControl('NumeroConexion', new FormControl(p.NumeroConexion ? p.NumeroConexion : posicion += 1));
      form.addControl('Id', new FormControl(p.Id));
      form.addControl('ConexionId', new FormControl(p.ConexionId));
      form.addControl('TipoConexionId', new FormControl(p.TipoConexionId));
      form.addControl('EstadoId', new FormControl(p.EstadoId));
      form.addControl('Observaciones', new FormControl(p.Observaciones));
      this.formConexiones.push(form);
      this.cuandoEsNoAplica(p.ConexionId, i)

    })

    console.log(this.formConexiones )  
  }

  cuandoEsNoAplica(event, i) {

    let formArray = this.formInpeccionVisualDimensional.get('Conexiones') as FormArray;
    let formGroup = formArray.get(i.toString());
    let numeroConexion = formGroup.get('NumeroConexion').value
    if (event == CONEXION.NOAPLICA || formGroup.get('ConexionId').value == (CONEXION.NOAPLICA)) {
      let cantidadConexioneNoAplican = formArray.controls.filter(d => d.get('ConexionId').value == CONEXION.NOAPLICA).length;
      let inspeccion = <InspeccionConexionModel>{
        NumeroConexion: numeroConexion,
        ConexionId: CONEXION.NOAPLICA,
        EstadoId: 0,
        TipoConexionId: 0,
        Observaciones: '',
        Id: 0
      }
      if (cantidadConexioneNoAplican > 2) {
        inspeccion.ConexionId = 0;
        formGroup.get('ConexionId').setValue(inspeccion);
        this.toastrService.info(ALERTAS_INFO_MENSAJE.maximoNoAplica);
        return
      }
 
      formGroup.reset(inspeccion)
      formGroup.setValue(inspeccion)
      
      formGroup.disable()
      formGroup.get('ConexionId').enable();
      formGroup.get('NumeroConexion').enable();

      

    } else {
      formGroup.enable();
    }

  }

  //consulta
  consultarParatros() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
      this.Conexiones = response.Consultas.filter(conexion => conexion.Grupo == GRUPOS.CONEXION);
      this.EstadosConexion = response.Consultas.filter(estados => estados.Grupo == GRUPOS.ESTADOSCONEXIONBOX || estados.Grupo == GRUPOS.ESTADOSCONEXIONPIN);
      this.TiposConexion = response.Consultas.filter(tipos => tipos.Grupo == GRUPOS.TIPOCONEXION);
      this.EquiposMedicionUsado = response.Consultas.filter(equpo => equpo.Grupo == GRUPOS.EQUIPOMEDICIONUTILIZADO);

    })
  }
}
