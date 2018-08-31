import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Form } from '@angular/forms';
import { ProcesoModel, EntidadModel, InspeccionConexionModel, InspeccionConexionFormatoModel, InspeccionConexionFormatoAdendumModel, InspeccionConexionFormatoParametrosModel, FormatoAdendumModel, FormatoParametroModel, FormatoModel } from '../../../common/models/Index';
import { ProcesoService, FormatoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { forEach } from '@angular/router/src/utils/collection';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ConfigService } from '../../../common/config/config.service';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-inspeccion-conexion',
  templateUrl: './inspeccion-conexion.component.html',
  styleUrls: ['./inspeccion-conexion.component.css']
})
export class InspeccionConexionComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }
  @Output() conexion = new EventEmitter();


  // proceso
  @Input() public proceso: ProcesoModel;
  @Input() public conexiones: InspeccionConexionModel[];
  //response
  private response: Boolean

  //data binding
  public InspeccionConexion: InspeccionConexionModel = new InspeccionConexionModel()
  public InspeccionConexionFormato: InspeccionConexionFormatoModel = new InspeccionConexionFormatoModel()
  public InspeccionConexionFormatoParametro: InspeccionConexionFormatoParametrosModel[] = []
  public InspeccionConexionFormatoAdendum: InspeccionConexionFormatoAdendumModel[] = []


  public adendums: Array<FormatoAdendumModel> = new Array<FormatoAdendumModel>()
  public parametros: Array<FormatoParametroModel> = new Array<FormatoParametroModel>()
  public formato: FormatoModel = new FormatoModel();

  //pathServer
  public path: string = ''

  // formulario
  public formularioformato: FormGroup
  public formularioInspeccionConexionFormato: FormGroup
  public formularioInspeccionConexionFormatoParametro: FormArray
  public formularioInspeccionConexionFormatoAdendum: FormArray

  //formulario datos catalogos
  public ParametrosFloatValveIds: EntidadModel[]
  public ParametrosEspecificaciones: EntidadModel[]

  ngOnInit() {
    this.obtenerRutaServidor();
    this.consultarParametros();

    this.iniciarFormaulario();
  }

  constructor(
    private configService: ConfigService,
    private formatoService: FormatoService,
    private formBuilder: FormBuilder,
    private procesoService: ProcesoService,
    private parametrosService: ParametroService,
    private toasrService: ToastrService,
    private loaderService: LoaderService

  ) { }

  //consultar
  obtenerRutaServidor() {
    this.path = this.configService.getConfiguration().webApiBaseUrl;
    this.path = this.path.split("api")[0];
      
  }
  consultarFormato(i: InspeccionConexionModel) {

    this.loaderService.display(true)

    this.formatoService.consultarFormatoPorInspeccionConexion(i).subscribe(response => {
      if (response) {
        i.Formato = response
        this.formato = i.Formato;

        if (i.InspeccionConexionFormato) {
          this.adendums = []
          this.parametros = []
          this.InspeccionConexionFormato = i.InspeccionConexionFormato;
          this.adendums = i.InspeccionConexionFormato.InspeccionConexionFormatoAdendum.map(t => t.FormatoAdendum)
          this.InspeccionConexionFormatoParametro = i.InspeccionConexionFormato.InspeccionConexionFormatoParametros
          this.InspeccionConexionFormatoAdendum = i.InspeccionConexionFormato.InspeccionConexionFormatoAdendum
          this.parametros = i.InspeccionConexionFormato.InspeccionConexionFormatoParametros.map(t => t.FormatoParametro)
        } else {
          this.adendums = response.Adendum

          this.parametros = response.FormatoFormatoParametro.map(r => r.FormatoParametro);
        }

      } else {
        this.adendums = []
        this.parametros = []
      }
      this.loaderService.display(false)
      this.iniciarFormaulario()
      this.inicicarFromularioInspeccionConexionFormatoParametros(i.InspeccionConexionFormato)
      this.inicicarFromularioInspeccionConexionFormatoAdendum(i.InspeccionConexionFormato)
    });

  }
  consultarParametros() {
    this.loaderService.display(true)

    this.parametrosService.consultarParametrosPorEntidad('INSPECCION_CONEXION').subscribe(
      response => {
        this.ParametrosFloatValveIds = response.Consultas.filter(d => d.Grupo == 'FLOAT_VALVE')
        this.ParametrosEspecificaciones = response.Consultas.filter(d => d.Grupo == 'ESPECIFICACION')
        this.loaderService.display(false)

      });
  };

  //gestion formularios
  iniciarFormaulario() {
    this.formularioformato = this.formBuilder.group({
      EspecificacionId: [this.formato.EspecificacionId],
      TPF: [this.formato.TPF],
      TPI: [this.formato.TPI],
    });
    this.formularioInspeccionConexionFormato = this.formBuilder.group({
      HerramientaId: [this.proceso.OrdenTrabajo.HerramientaId],
      ClienteId: [this.proceso.OrdenTrabajo.ClienteId],
      Id: [this.InspeccionConexionFormato.Id ? this.InspeccionConexionFormato.Id : 0],
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
      InspeccionConexionFormatoAdendum: this.formBuilder.array([]),
      InspeccionConexionFormatoParametros: this.formBuilder.array([])
    });


  }
  inicicarFromularioInspeccionConexionFormatoAdendum(conexion?) {
    let arrayForm = this.formularioInspeccionConexionFormato.get('InspeccionConexionFormatoAdendum') as FormArray
    arrayForm.controls = []

    if (!conexion) {
      this.InspeccionConexionFormatoAdendum = []
      this.adendums.forEach(para => {
        let InspeccionConexionFormatoAdendum: InspeccionConexionFormatoAdendumModel =
          { FormatoAdendum: para }
        this.InspeccionConexionFormatoAdendum.push(InspeccionConexionFormatoAdendum)
      })
    }

    if (this.InspeccionConexionFormatoAdendum.length > 0) {
      this.InspeccionConexionFormatoAdendum.forEach(i => {
        let InspeccionConexionFormatoAdendum = this.formBuilder.group({
          Id: i.Id ? i.Id : 0,
          FormatoAdendum: i.FormatoAdendum,
          FormatoAdendumId: i.FormatoAdendumId,
        });
        arrayForm.push(InspeccionConexionFormatoAdendum);
      })
    }
  }
  inicicarFromularioInspeccionConexionFormatoParametros(conexion?) {
    let arrayForm = this.formularioInspeccionConexionFormato.get('InspeccionConexionFormatoParametros') as FormArray
    arrayForm.controls = []

    if (!conexion) {
      this.InspeccionConexionFormatoParametro = []
      this.parametros.forEach(para => {
        let InspeccionConexionFormatoParametro: InspeccionConexionFormatoParametrosModel =
          { FormatoParametro: para }
        this.InspeccionConexionFormatoParametro.push(InspeccionConexionFormatoParametro)
      })
    }


    if (this.InspeccionConexionFormatoParametro.length > 0) {
      this.InspeccionConexionFormatoParametro.forEach(i => {
        let InspeccionConexionFormatoParametro = this.formBuilder.group({
          Id: i.Id ? i.Id : 0,
          EstaConforme: i.EstaConforme,
          FormatoParametro: i.FormatoParametro,
          FormatoParametroId: i.FormatoParametroId,
        });
        arrayForm.push(InspeccionConexionFormatoParametro);
      })
    }
  }
  esFormalarioValido(): boolean {
    if (!(this.formularioformato.valid || this.formularioInspeccionConexionFormato.valid)) {
      return false;
    }
    return true
  }
  asignarDatosFormulario(InspeccionConexion: InspeccionConexionModel): InspeccionConexionModel {
    InspeccionConexion.InspeccionConexionFormato = new InspeccionConexionFormatoModel();
    Object.assign(InspeccionConexion.InspeccionConexionFormato, this.formularioInspeccionConexionFormato.value)
    delete InspeccionConexion.Formato
    return InspeccionConexion;
  }

  //Conexixon Seleccionada
  seleccionConexion(conexion: InspeccionConexionModel) {

    if (conexion) {
      this.consultarFormato(conexion);

    }

    if (!conexion.Formato) {
      this.formato = new FormatoModel()
      this.adendums = []
      this.parametros = []
    } else {
      
      
      if (!conexion.InspeccionConexionFormato) {
        this.adendums = this.formato.Adendum
        this.parametros = this.formato.FormatoFormatoParametro.map(t => t.FormatoParametro)
      }


    }

  }

  estadoInspeccion() {

  }

  //enviarDatos
  //aciones
  confirmarAction(conexion) {
    if (!this.esFormalarioValido()) {
      this.toasrService.error('Faltan datos por diligenciar')
      return
    }
    this.InspeccionConexion = this.conexiones.find(c => c.Id == conexion);
    this.InspeccionConexion = this.asignarDatosFormulario(this.InspeccionConexion)
    this.conexion.emit(this.InspeccionConexion);
    this.cerrarModal(conexion);
  }
  private cerrarModal(conexion: any) {
    document.getElementById('close-inspeccion-conexion-' + conexion).click();
  }

  cancelarAction() {
    this.response = false;
    this.conexion.emit(this.response);
  }


}
