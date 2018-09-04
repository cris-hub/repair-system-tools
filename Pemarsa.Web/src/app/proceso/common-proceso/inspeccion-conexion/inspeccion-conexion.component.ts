import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Form } from '@angular/forms';
import { ProcesoService, FormatoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { forEach } from '@angular/router/src/utils/collection';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ConfigService } from '../../../common/config/config.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CONEXION } from '../../inspeccion-enum/inspeccion.enum';
import { AttachmentModel } from '../../../common/models/AttachmentModel';
import { ConexionEquipoMedicionUsadoModel } from '../../../common/models/ConexionEquipoMedicionUsadoModel';
import { EntidadModel } from '../../../common/models/EntidadDTOModel';
import { InspeccionConexionFormatoModel } from '../../../common/models/InspeccionConexionFormatoModel';
import { InspeccionConexionModel } from '../../../common/models/InspeccionConexionModel';
import { ProcesoModel } from '../../../common/models/ProcesoModel';

@Component({
  selector: 'app-inspeccion-conexion',
  templateUrl: './inspeccion-conexion.component.html',
  styleUrls: ['./inspeccion-conexion.component.css']
})
export class InspeccionConexionComponent implements OnInit ,OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }
  @Output() conexion = new EventEmitter();


  // proceso
  @Input() public proceso: ProcesoModel;
  //response
  private response: Boolean

  //data binding

  public equipoUsado: EntidadModel[] = []

  //pathServer
  public path: string = ''
  public alturar = '44'

  // formulario
  public formularioformato: FormGroup
  public formularioInspeccionConexionFormato: FormGroup
  public formularioInspeccionConexionFormatoParametro: FormArray
  public formularioInspeccionConexionFormatoAdendum: FormArray
  public disable = false;
  //formulario datos catalogos
  public ParametrosFloatValveIds: EntidadModel[]
  public ParametrosEspecificaciones: EntidadModel[]
  public ParametrosEquipoMedicion: EntidadModel[]

  ngOnInit() {
    this.proceso.InspeccionConexionFormato = this.proceso.InspeccionConexionFormato ? this.proceso.InspeccionConexionFormato : new InspeccionConexionFormatoModel();
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

  consultarParametros() {
    this.loaderService.display(true)

    this.parametrosService.consultarParametrosPorEntidad('INSPECCION_CONEXION').subscribe(
      response => {
        this.ParametrosFloatValveIds = response.Consultas.filter(d => d.Grupo == 'FLOAT_VALVE')
        this.ParametrosEspecificaciones = response.Consultas.filter(d => d.Grupo == 'ESPECIFICACION')
        this.ParametrosEquipoMedicion = response.Consultas.filter(d => d.Grupo == 'EQUIPO_MEDICION_UTILIZADO_PROCESO')
        this.loaderService.display(false)

      });
  };



  //gestion formularios
  iniciarFormaulario() {

    this.formularioInspeccionConexionFormato = this.formBuilder.group({
      HerramientaId: [this.proceso.OrdenTrabajo.HerramientaId],
      ClienteId: [this.proceso.OrdenTrabajo.ClienteId],
      IdAsignaUsuario: [this.proceso.InspeccionConexionFormato.IdAsignaUsuario],
      NombreUsuarioElabora: [this.proceso.InspeccionConexionFormato.NombreUsuarioElabora],
      EstaConforme: [this.proceso.InspeccionConexionFormato.EstaConforme],


    });


  }

  asignarFile(file: AttachmentModel) {
    this.proceso.InspeccionConexionFormato.FormatoAdjunto = file;
  }

  esFormalarioValido(): boolean {
    if (!(this.formularioInspeccionConexionFormato.valid)) {
      return false;
    }
    return true
  }
  asignarDatosFormulario(InspeccionConexionFormato: InspeccionConexionFormatoModel): InspeccionConexionFormatoModel {
    if (!InspeccionConexionFormato) {
      InspeccionConexionFormato = new InspeccionConexionFormatoModel();

    }
    Object.assign(InspeccionConexionFormato, this.formularioInspeccionConexionFormato.value)
    
    return InspeccionConexionFormato;
  }

  asignarEquipoMedicion(equipoMedicion: FormGroup) {
    let catalogos: EntidadModel[] = equipoMedicion.value.ProcesoEquipoMedicion;

    this.proceso.InspeccionConexionFormato.ConexionEquipoMedicionUsado = catalogos
      .map(t => {
        let ConexionEquipoMedicionUsado: ConexionEquipoMedicionUsadoModel = new ConexionEquipoMedicionUsadoModel()
        ConexionEquipoMedicionUsado.EquipoMedicionId = t.Id
        return ConexionEquipoMedicionUsado;
      })

  }

  //Conexixon Seleccionada
  seleccionConexion(conexion: InspeccionConexionModel) {

    if (!conexion.InspeccionConexionFormato) {
      this.disable = false;

    }

  }



  //enviarDatos
  //aciones

  confirmarAction(conexion) {
    if (!this.esFormalarioValido()) {
      this.toasrService.error('Faltan datos por diligenciar')
      return
    }

    this.proceso.InspeccionConexionFormato = this.asignarDatosFormulario(this.proceso.InspeccionConexionFormato)
    this.conexion.emit(this.proceso.InspeccionConexionFormato);
    this.cerrarModal(conexion);
  }
  private cerrarModal(conexion: any) {
    document.getElementById('modalSugerir').setAttribute('disabled', 'true');

    document.getElementById('close-inspeccion-conexion').click();
  }

  cancelarAction() {
    this.response = false;
    this.conexion.emit(this.response);
  }


}
