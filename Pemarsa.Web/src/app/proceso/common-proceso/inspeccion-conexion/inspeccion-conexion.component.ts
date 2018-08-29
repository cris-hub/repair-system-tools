import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProcesoModel, EntidadModel, InspeccionConexionModel, InspeccionConexionFormatoModel, InspeccionConexionFormatoAdendumModel, InspeccionConexionFormatoParametrosModel, FormatoAdendumModel, FormatoParametroModel, FormatoModel } from '../../../common/models/Index';
import { ProcesoService, FormatoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-inspeccion-conexion',
  templateUrl: './inspeccion-conexion.component.html',
  styleUrls: ['./inspeccion-conexion.component.css']
})
export class InspeccionConexionComponent implements OnInit {
  @Output() confir = new EventEmitter();
  
  
  // proceso
  @Input() public proceso: ProcesoModel;
  @Input() public conexiones: InspeccionConexionModel[];
  //response
  private response: Boolean

  //data binding
  public InspeccionConexionFormato: InspeccionConexionFormatoModel = new InspeccionConexionFormatoModel()
  public InspeccionConexionFormatoParametro: InspeccionConexionFormatoParametrosModel = new InspeccionConexionFormatoParametrosModel()
  public InspeccionConexionFormatoAdendum: InspeccionConexionFormatoAdendumModel = new InspeccionConexionFormatoAdendumModel()

  public adendums: Array<FormatoAdendumModel> = new Array<FormatoAdendumModel>()
  public parametros: Array<FormatoParametroModel> = new Array<FormatoParametroModel>()
  public formato: FormatoModel = new FormatoModel();
  public formatos: FormatoModel[] = []
  

  // formulario
  public formularioformato: FormGroup
  public formularioInspeccionConexionFormato: FormGroup
  public formularioInspeccionConexionFormatoParametro: FormGroup
  public formularioInspeccionConexionFormatoAdendum: FormGroup

  //formulario datos catalogos
  public ParametrosFloatValveIds : EntidadModel[]
  public ParametrosEspecificaciones : EntidadModel[]

  ngOnInit() {
    this.consultarFormato();
    this.iniciarFormaulario();

  }

  constructor(
    private formatoService : FormatoService,
    private formBuilder: FormBuilder,
    private procesoService: ProcesoService,
    private parametrosService: ParametroService,
    private toasrService: ToastrService,

  ) { }


  consultarFormato() {
    if (this.conexiones.length>0) {
      for (var i of this.conexiones) {
        this.formatoService.consultarFormatoPorInspeccionConexion(i).subscribe(response => {
          this.formatos.push(response);
        });
      }
    }
  }
  iniciarFormaulario() {
    this.formularioformato = this.formBuilder.group({
      EspecificacionId: [this.formato.EspecificacionId],
      TPF: [this.formato.TPF],
      TPI: [this.formato.TPI],
    });
    this.formularioInspeccionConexionFormato = this.formBuilder.group({
      IdAsignaUsuario: [this.InspeccionConexionFormato.IdAsignaUsuario],
      FloatBoardId: [this.InspeccionConexionFormato.FloatBoardId],
      FloatBoardLongitud: [this.InspeccionConexionFormato.FloatBoardLongitud],
      FloatValveId: [this.InspeccionConexionFormato.FloatValveId],
      EsEstampado: [this.InspeccionConexionFormato.EsEstampado],
      EsBoreBack: [this.InspeccionConexionFormato.EsBoreBack],
      EsCw: [this.InspeccionConexionFormato.EsCw],
      EsStandBlasting: [this.InspeccionConexionFormato.EsStandBlasting],
      NombreUsuarioElabora: [this.InspeccionConexionFormato.NombreUsuarioElabora],
      EstaConforme: [this.InspeccionConexionFormato.EstaConforme],
    });
    this.formularioInspeccionConexionFormatoParametro = this.formBuilder.group({

      EstaConforme: [this.InspeccionConexionFormatoParametro.EstaConforme],
    });
    this.formularioInspeccionConexionFormatoAdendum = this.formBuilder.group({

    });

  }


  cancelarAction() {
    this.response = false;
    this.confir.emit(this.response);
  }





}
