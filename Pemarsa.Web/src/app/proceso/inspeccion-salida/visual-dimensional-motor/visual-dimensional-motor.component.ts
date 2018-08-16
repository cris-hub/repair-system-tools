import { Component, OnInit, ViewChild } from '@angular/core';
import { AttachmentModel, InspeccionModel, ProcesoModel, InspeccionFotosModel, InspeccionConexionModel, ParametrosModel, EntidadModel, CatalogoModel, InspeccionEquipoUtilizadoModel } from '../../../common/models/Index';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_MENSAJE, ALERTAS_ERROR_TITULO, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ESTADOS_PROCESOS, TIPOS_CONEXION, CONEXION, ALERTAS_INFO_MENSAJE } from '../../inspeccion-enum/inspeccion.enum';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { isUndefined } from 'util';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ProcesoInspeccionSalidaModel } from '../../../common/models/ProcesoInspeccionSalidaModel';

@Component({
  selector: 'app-visualdimencional',
  templateUrl: './visual-dimensional-motor.component.html',
  styleUrls: ['./visual-dimensional-motor.component.css']
})
export class VisualDimensionalMotorComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;


  //carga archivos
  public  lectorArchivos: FileReader;
  public  adjuntos: AttachmentModel[] = [];
  public  adjunto: AttachmentModel;
  public  DocumetosRestantes: number = 2;

  //procesoInpeccion
  public  proceso: ProcesoModel;
  public  inspeccion: InspeccionModel = new InspeccionModel();



  //catalogos
  public  Conexiones: EntidadModel[] = new Array<EntidadModel>();
  public  Conexion: EntidadModel = new EntidadModel();
  public  EstadosConexion: EntidadModel[] = new Array<EntidadModel>();
  public  TiposConexion: EntidadModel[] = new Array<EntidadModel>();
  public  EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();




  //form
  public  formInpeccionVisualDimensional: FormGroup;
  public  esFormularioValido: Boolean = false;
  public  esVer: Boolean = false;
  public  formConexiones: FormArray;

  //autoCompletar
  public  equipo: CatalogoModel;


  constructor(
    private loaderService: LoaderService,
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private location: Location
  ) {

  }

  ngOnInit() {

    this.consultarParatros();
    this.consultarProceso();
  }

  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    parametrosUlrMap.set('pieza', this.activedRoute.snapshot.paramMap.get('index'));
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[0].path);
    parametrosUlrMap.set('accion', this.activedRoute.snapshot.url[3].path);

    return parametrosUlrMap;
  }


  //consultas
  consultarProceso() {
    this.iniciarFormulario(new InspeccionModel());

    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response
        let ProcesoInspeccionSalida: ProcesoInspeccionSalidaModel = response.ProcesoInspeccionSalida.find(c => {
          return (
            c.Inspeccion.TipoInspeccionId == TIPO_INSPECCION[this.obtenerParametrosRuta().get('tipoInspeccion')]
            && c.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO)

        });
        this.inspeccion = ProcesoInspeccionSalida.Inspeccion;
        this.DocumetosRestantes -= this.inspeccion.InspeccionFotos.length;
        console.log(this.inspeccion)
      }, error => {

      }, () => {


        this.inspeccion ? this.iniciarFormulario(this.inspeccion) : this.iniciarFormulario(new InspeccionModel());
      });
  }
  consultarParatros() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
      this.Conexiones = response.Consultas.filter(conexion => conexion.Grupo == GRUPOS.CONEXION);
      this.EstadosConexion = response.Consultas.filter(estados => estados.Grupo == GRUPOS.ESTADOSCONEXIONBOX || estados.Grupo == GRUPOS.ESTADOSCONEXIONPIN);
      this.TiposConexion = response.Consultas.filter(tipos => tipos.Grupo == GRUPOS.TIPOCONEXION);
      this.EquiposMedicionUsado = response.Consultas.filter(equpo => equpo.Grupo == GRUPOS.EQUIPOMEDICIONUTILIZADO);

    })
  }



  //actualizaciones
  procesar() {
    this.procesoService.iniciarProcesar = true
    this.asignarDataDesdeElFormulario();
    this.esFormularioValido = this.sonValidosLosDatosIngresadosPorElUsuario(this.formInpeccionVisualDimensional);
    if (this.esFormularioValido) {
      this.actualizarDatos()
    }

  }

  actualizarDatos() {
    this.loaderService.display(true)
    this.procesoService.actualizarInspección(this.inspeccion).subscribe(
      response => {
        if (response) {
          this.toastrService.success(ALERTAS_OK_MENSAJE.InspeccionActualizada)
        } else
          this.toastrService.error(ALERTAS_ERROR_MENSAJE.InspeccionERRORactualizar);

        this.loaderService.display(false)

      }, error => {
        this.toastrService.error(error.messge);
        this.loaderService.display(false)
      }, () => {
        this.consultarSiguienteInspeccion(this.proceso.Guid);

        this.loaderService.display(false)
      })
  }




  consultarSiguienteInspeccion(guidProceso: string) {

    console.log(this.obtenerParametrosRuta().get('pieza'), this.procesoService.iniciarProcesar)
    if (this.proceso.EstadoId == ESTADOS_PROCESOS["En Proceso"] && this.obtenerParametrosRuta().get('pieza') && this.procesoService.iniciarProcesar) {

      this.procesoService.consultarSiguienteInspeccion(guidProceso, this.obtenerParametrosRuta().get('pieza')).subscribe(response => {
        this.inspeccion = response;

        if (response == null) {
          this.completarProcesoInspeccion(guidProceso);
          this.procesoService.iniciarProcesar = false;
          this.router.navigate([
            'inspeccion/salida/' +
            this.obtenerParametrosRuta().get('procesoId') + '/' +
            this.obtenerParametrosRuta().get('pieza') + '/' +
            this.obtenerParametrosRuta().get('accion')]);

          return
        }
        this.router.navigate([
          'inspeccion/salida/' +
          TIPO_INSPECCION[this.inspeccion.TipoInspeccionId] + '/' +
          this.obtenerParametrosRuta().get('procesoId') + '/' +
          this.obtenerParametrosRuta().get('pieza') + '/' +
          this.obtenerParametrosRuta().get('accion')]);
      });
    }
  }

  completarProcesoInspeccion(guidProceso: string) {
    debugger
    if (this.proceso.ProcesoInspeccionSalida.filter(d => d.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA).every(d => d.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA)) {
      this.procesoService.actualizarEstadoProceso(this.proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
        if (response) {
          this.router.navigate(['inspeccion/salida'])
        };
      });
    }
  }


  //cargar o inicializar datos del formulario
  iniciarFormulario(inspeccion: InspeccionModel) {
    this.formInpeccionVisualDimensional = this.formBuider.group({
      InspeccionFotos: [this.inspeccion.InspeccionFotos ? '' : ''],
      Observaciones: [this.inspeccion.Observaciones, Validators.required],
      IntensidadLuzBlanca: [this.inspeccion.IntensidadLuzBlanca, Validators.required],
      InspeccionEquipoUtilizado: [this.inspeccion.InspeccionEquipoUtilizado],

      Conexiones: this.formBuider.array([])
    });
    this.crearFormConexiones()
  }
  private asignarDataDesdeElFormulario() {
    delete this.formInpeccionVisualDimensional.value['InspeccionFotos']
    delete this.formInpeccionVisualDimensional.value['InspeccionEquipoUtilizado']
    Object.assign(this.inspeccion, this.formInpeccionVisualDimensional.value);
  }

  crearFormConexiones(): any {

    if (!this.formInpeccionVisualDimensional) {
      return
    }

    this.formConexiones = this.formInpeccionVisualDimensional.get('Conexiones') as FormArray;

    let posicion = this.formConexiones.controls.length


    while (this.inspeccion.Conexiones.length < 3) {
      this.inspeccion.Conexiones.push(new InspeccionConexionModel())

    }



    this.inspeccion.Conexiones.forEach((p, i) => {


      let form = this.formBuider.group({});
      form.addControl('NumeroConexion', new FormControl(posicion += 1));
      form.addControl('Id', new FormControl(p.Id));
      form.addControl('ConexionId', new FormControl(p.ConexionId));
      form.addControl('TipoConexionId', new FormControl(p.TipoConexionId));
      form.addControl('EstadoId', new FormControl(p.EstadoId));
      form.addControl('Observaciones', new FormControl(p.Observaciones));
      this.formConexiones.push(form);
      this.cuandoEsNoAplica(p.ConexionId, i)
    })




  }
  sonValidosLosDatosIngresadosPorElUsuario(formulario: FormGroup) {
    let valido: boolean;

    valido = this.formularioValido(formulario, valido);

    valido = this.documentosSubidosValido(valido);

    valido = this.InspeccionEquipoUtilizadoValido(valido);

    return valido

  }
  private documentosSubidosValido(valido: boolean) {
    if (this.inspeccion.InspeccionFotos.length < this.DocumetosRestantes) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes);
      valido = false;
    }
    return valido;
  }
  private InspeccionEquipoUtilizadoValido(valido: boolean) {
    if (this.inspeccion.InspeccionEquipoUtilizado.length < 1) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.EquipoMedicion);
      valido = false;
    }
    return valido;
  }
  private formularioValido(formulario: FormGroup, valido: boolean) {
    formulario.controls['Observaciones'].status
      != 'VALID'
      ? this.toastrService.error(ALERTAS_ERROR_MENSAJE.Observaciones, ALERTAS_ERROR_TITULO.DatosObligatorios)
      : valido = false;
    formulario.controls['IntensidadLuzBlanca'].status
      != 'VALID'
      ? this.toastrService.error(ALERTAS_ERROR_MENSAJE.LuzBlanca, ALERTAS_ERROR_TITULO.DatosObligatorios)
      : valido = false;
    formulario.controls['Conexiones'].status
      != 'VALID'
      ? this.toastrService.error(ALERTAS_ERROR_MENSAJE.Conexiones, ALERTAS_ERROR_TITULO.DatosObligatorios)
      : valido = false;
    formulario.status
      == 'VALID'
      ? valido = true
      : valido = false;
    return valido;
  }

  cuandoEsNoAplica(event, i) {
    let formArray = this.formInpeccionVisualDimensional.get('Conexiones') as FormArray;
    let formGroup = formArray.get(i.toString());
    if (event == CONEXION.NOAPLICA || formGroup.get('ConexionId').value == (CONEXION.NOAPLICA)) {
      let cantidadConexioneNoAplican = formArray.controls.filter(d => d.get('ConexionId').value == CONEXION.NOAPLICA).length;
      if (cantidadConexioneNoAplican > 2) {
        formGroup.get('ConexionId').setValue(0);
        this.toastrService.info(ALERTAS_INFO_MENSAJE.maximoNoAplica);
        return
      }

      formGroup.reset({
        NumeroConexion: formGroup.get('NumeroConexion').value,
        ConexionId: CONEXION.NOAPLICA,
        EstadoId: null,
        TipoConexionId: null,
        Observaciones: '',
        Id: 0


      })
      formGroup.disable()
      formGroup.get('ConexionId').enable();
      formGroup.get('ConexionId').setValue(CONEXION.NOAPLICA)

      console.log(formGroup);

    } else {
      formGroup.enable();
    }
    console.log(event)
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

  //elementos seleccionados
  selectItem(event, input) {
    if (!event.item) {
      return
    }

    this.inspeccion.InspeccionEquipoUtilizado.push(<InspeccionEquipoUtilizadoModel>{
      EquipoUtilizadoId: event.item.Id,
      InspeccionId: this.inspeccion.Id,
      EquipoUtilizado: event.item
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
    let index = this.inspeccion.InspeccionEquipoUtilizado.findIndex(c => c.EquipoUtilizado.Id == equipo.Id);
    this.inspeccion.InspeccionEquipoUtilizado.splice(index, 1)
    this.añadirAlistaMostrar(this.EquiposMedicionUsado, equipo)
  }
  añadirAlistaMostrar(EquiposMedicionUsado: EntidadModel[], objetoAñadir: EntidadModel) {
    EquiposMedicionUsado.push(objetoAñadir);
  }

  //carga archivos
  addFile(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos)
    }
    if (this.DocumetosRestantes <= 0 || files.length > this.DocumetosRestantes) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
      return;
    }
    if (files.length > this.DocumetosRestantes) {
      this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes)
      return;
    }


    for (var i = 0; i < files.length; i++) {
      let inspeccionFotos = new InspeccionFotosModel();
      inspeccionFotos.DocumentoAdjunto = this.obtenerDatosArchivoAdjunto(files[i]);
      inspeccionFotos.InspeccionId = this.inspeccion.Id;
      inspeccionFotos.Estado = true;
      inspeccionFotos.Pieza = this.obtenerParametrosRuta().get('pieza')
        ? parseInt(this.obtenerParametrosRuta().get('pieza'), 10) : 1;
      this.inspeccion.InspeccionFotos.push(inspeccionFotos);

      this.DocumetosRestantes -= 1;


    }



  }
  eliminarAdjunto(adjunto: AttachmentModel) {
    let index: any = this.inspeccion.InspeccionFotos.findIndex(c => c.DocumentoAdjuntoId == adjunto.Id);
    this.inspeccion.InspeccionFotos.find(e => e.DocumentoAdjuntoId == adjunto.Id).Estado = false;
    this.DocumetosRestantes += 1;
    this.inspeccion.InspeccionFotos.splice(index, 1);
  }

  obtenerDatosArchivoAdjunto(file: File): AttachmentModel {
    let archivo = new AttachmentModel();
    this.lectorArchivos = new FileReader();

    this.lectorArchivos.readAsDataURL(file)
    try {
      this.lectorArchivos.onload = (e: any) => {
        archivo.Extension = this.obtenerExtensionArchivo(e)
        archivo.NombreArchivo = this.obtenerNombreArchivo(file)
        archivo.Stream = this.obtenerStreamArchivo(e);
      }

      return archivo;
    } catch (error) {
      console.log(error)
    }
  }
  obtenerExtensionArchivo(e: any) {
    return e.currentTarget.result.split(',')[0].split('/')[1].split(';')[0];
  }
  obtenerNombreArchivo(file: File) {
    return file.name;
  }
  obtenerStreamArchivo(e: any) {
    return e.currentTarget.result.split(',')[1];
  }
  leerArchivo(event) {
    try {
      if (event.target.files.length > 0) {
        return event.target.files;
      }
    }
    catch (ex) {
      console.log(ex)
    }
  }

}
