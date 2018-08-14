import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentModel, InspeccionModel, ProcesoModel, EntidadModel, CatalogoModel, InspeccionEquipoUtilizadoModel, InspeccionFotosModel, InspeccionInsumoModel } from '../../../common/models/Index';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_MENSAJE, ALERTAS_ERROR_TITULO, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { isUndefined } from 'util';
import { Location } from '@angular/common';
import { ValidacionDirective } from '../../../common/directivas/validacion/validacion.directive';

@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.css']
})
export class EMIComponent implements OnInit {

  @ViewChild('instance') instance: NgbTypeahead;
  @ViewChild('espesor') espesor: ElementRef;

  //carga archivos
  public  lectorArchivos: FileReader;
  public  adjuntos: AttachmentModel[] = [];
  public  adjunto: AttachmentModel;
  public  DocumetosRestantes: number = 2;

  //procesoInpeccion
  public  proceso: ProcesoModel;
  public  inspeccion: InspeccionModel = new InspeccionModel();

  //catalogos
  public  TubosPatrones: EntidadModel[];
  public  EquiposEmi: EntidadModel[];
  public  BobinasMagneticas: EntidadModel[];

  //autocompletarEquipoMedicion
  public  EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();
  public  equipo: CatalogoModel;


  //form

  public  formulario: FormGroup;
  public  esFormularioValido: Boolean = false;

  constructor(
    private location: Location,
    private procesoService: ProcesoService,
    private toastrService: ToastrService,
    private parametroService: ParametroService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit() {
    this.consultarParatros()
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

  consultarParatros() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
      this.TubosPatrones = response.Catalogos.filter(equpo => equpo.Grupo == GRUPOS.TUBOSPATRONES);
      this.EquiposEmi = response.Catalogos.filter(equpo => equpo.Grupo == GRUPOS.EQUIPOSEMI);
      this.BobinasMagneticas = response.Catalogos.filter(equpo => equpo.Grupo == GRUPOS.BOBINASMAGNETICAS);
    })
  }

  consultarProceso() {
    this.iniciarFormulario(new InspeccionModel());
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response

        let inspeccionEntrada: ProcesoInspeccionEntradaModel = response.InspeccionEntrada.find(c => {
          return (
            c.Inspeccion.TipoInspeccionId
            == TIPO_INSPECCION[this.obtenerParametrosRuta().get('tipoInspeccion')]
            && c.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO)
        });

        this.inspeccion = inspeccionEntrada.Inspeccion;


        this.inspeccion.ImagenMfl
          ? this.inspeccion.ImagenMfl
          : this.inspeccion.ImagenMfl = new AttachmentModel();

        this.inspeccion.ImagenMedicionEspesores
          ? this.inspeccion.ImagenMedicionEspesores
          : this.inspeccion.ImagenMedicionEspesores = new AttachmentModel();

        this.DocumetosRestantes -= this.inspeccion.InspeccionFotos.length;
        console.log(this.inspeccion)
        this.loaderService.display(false)

      }, error => {
        this.loaderService.display(false)

      }, () => {
        this.loaderService.display(false)

        this.inspeccion ? this.iniciarFormulario(this.inspeccion) : this.iniciarFormulario(new InspeccionModel());
      });
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

  selectItem(event) {
    if (!event.item) {
      return
    }

    this.inspeccion.InspeccionEquipoUtilizado.push(<InspeccionEquipoUtilizadoModel>{
      EquipoUtilizadoId: event.item.Id,
      InspeccionId: this.inspeccion.Id,
      EquipoUtilizado: event.item
    });
    this.removerDeListaAMostrar(this.EquiposMedicionUsado, event.item)

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



  //persistir
  procesar() {
    this.procesoService.iniciarProcesar = true
    this.asignarDataDesdeElFormulario();
    this.esFormularioValido = this.sonValidosLosDatosIngresadosPorElUsuario(this.formulario);
    if (this.esFormularioValido) {
      this.actualizarDatos()
    }

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
            'inspeccion/entrada/' +
            this.obtenerParametrosRuta().get('procesoId') + '/' +
            this.obtenerParametrosRuta().get('pieza') + '/' +
            this.obtenerParametrosRuta().get('accion')]);
          return
        }
        this.router.navigate([
          'inspeccion/entrada/' +
          TIPO_INSPECCION[this.inspeccion.TipoInspeccionId] + '/' +
          this.obtenerParametrosRuta().get('procesoId') + '/' +
          this.obtenerParametrosRuta().get('pieza') + '/' +
          this.obtenerParametrosRuta().get('accion')]);
      });
    }
  }
  completarProcesoInspeccion(guidProceso: string) {
    debugger
    if (this.proceso.InspeccionEntrada.filter(d => d.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA).every(d => d.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA)) {
      this.procesoService.actualizarEstadoProceso(this.proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
        if (response) {
          this.router.navigate(['inspeccion/entrada'])
        };
      });
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

  sonValidosLosDatosIngresadosPorElUsuario(formulario: FormGroup) {
    let valido: boolean;

    valido = this.formularioValido(formulario, valido);





    return valido
  }
  private formularioValido(formulario: FormGroup, valido: boolean) {
    formulario.status
      == 'VALID'
      ? valido = true
      : valido = false;
    return valido;
  }


  private asignarDataDesdeElFormulario() {
    //deja el arreglo
    delete this.formulario.value['ImagenMfl']
    delete this.formulario.value['ImagenMedicionEspesores']

    Object.assign(this.inspeccion, this.formulario.value);
  }

  //cargar o inicializar datos del formulario
  iniciarFormulario(inspeccion: InspeccionModel) {
    
    this.formulario = this.formBuider.group({
      SeIdentificaDefecto: [inspeccion.SeIdentificaDefecto, Validators.required],
      Observaciones: [inspeccion.Observaciones, Validators.required],
      ImagenMfl: [inspeccion.ImagenMfl.NombreArchivo ? '' : ''],
      ImagenMedicionEspesores: [inspeccion.ImagenMedicionEspesores.NombreArchivo ? '' : ''],
      Amperaje: [inspeccion.Amperaje],
      VelocidadBuggyDrive: [inspeccion.VelocidadBuggyDrive],
      TuboPatronId: [inspeccion.TuboPatronId],
      EquipoEmiId: [inspeccion.EquipoEmiId],
      BobinaMagneticaId: [inspeccion.BobinaMagneticaId],
      EstaConforme: [inspeccion.EstaConforme],

    });


  }
  seRegistraTrazabilidad(event) {
    console.log(this.espesor)

    console.log(event)
    if (event == 'true') {
      
      this.formulario.controls['Amperaje'].setValidators(Validators.required);
      this.formulario.controls['VelocidadBuggyDrive'].setValidators(Validators.required);
      this.formulario.controls['TuboPatronId'].setValidators(Validators.required);
      this.formulario.controls['EquipoEmiId'].setValidators(Validators.required);
      this.formulario.controls['BobinaMagneticaId'].setValidators(Validators.required);
      
    } else {
      
      this.formulario.controls['Amperaje'].setValidators(null);
      this.formulario.controls['VelocidadBuggyDrive'].setValidators(null);
      this.formulario.controls['TuboPatronId'].setValidators(null);
      this.formulario.controls['EquipoEmiId'].setValidators(null);
      this.formulario.controls['BobinaMagneticaId'].setValidators(null);
      
    }
    this.formulario.clearAsyncValidators();
    this.formulario.reset();
    this.formulario.controls['SeIdentificaDefecto'].setValue(event);
    
    this.formulario.updateValueAndValidity()
  }


  validacion(value) {
    
    console.log(this.espesor.nativeElement)
    console.log(value)
    if (value!= null) {
      if (value == 'true') {
        return 'requerido'

      } else {
        return ''

      }
    }
    return 'requerido'
  }

  //carga archivos
  addFileEspesorese(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos)
    }
    if (this.DocumetosRestantes <= 0) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
      return;
    }
    if (files.length > this.DocumetosRestantes) {
      this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes)
      return;
    }

    for (var i = 0; i < files.length; i++) {
      let docEspesores = new AttachmentModel();
      docEspesores = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenMedicionEspesores = docEspesores
      this.DocumetosRestantes -= 1;

    }



  }
  addFileMFL(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos)
    }
    if (this.DocumetosRestantes <= 0) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
      return;
    }
    if (files.length > this.DocumetosRestantes) {
      this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes)
      return;
    }
    for (var i = 0; i < files.length; i++) {
      let docMFL = new AttachmentModel();
      docMFL = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenMfl = docMFL
      this.DocumetosRestantes -= 1;
    }



  }
  eliminarAdjuntoImagenMedicionEspesores(adjunto: AttachmentModel) {
    this.inspeccion.ImagenMfl.Estado = false
    
    
  } eliminarAdjuntoImagenMfl(adjunto: AttachmentModel) {
    this.inspeccion.ImagenMfl.Estado = false

    
    this.inspeccion.ImagenMfl = new AttachmentModel();
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
