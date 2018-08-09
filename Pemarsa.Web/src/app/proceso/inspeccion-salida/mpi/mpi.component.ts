import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AttachmentModel, ProcesoModel, InspeccionModel, InspeccionFotosModel, EntidadModel, CatalogoModel, InspeccionEquipoUtilizadoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_TITULO, ALERTAS_ERROR_MENSAJE, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { isUndefined } from 'util';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mpi',
  templateUrl: './mpi.component.html',
  styleUrls: ['./mpi.component.css']
})
export class MPIComponent implements OnInit {

  @ViewChild('instance') instance: NgbTypeahead;
  @ViewChild('InspeccionEquipoUtilizado') InspeccionEquipoUtilizado: ElementRef;

  //carga archivos
  public  lectorArchivos: FileReader;
  public  adjuntos: AttachmentModel[] = [];
  public  adjunto: AttachmentModel;
  public  DocumetosRestantes: number = 2;

  //procesoInpeccion
  public  proceso: ProcesoModel;
  public  inspeccion: InspeccionModel = new InspeccionModel();

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

  //parametros ruta
  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    parametrosUlrMap.set('pieza', this.activedRoute.snapshot.paramMap.get('index'));
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[2].path);
    parametrosUlrMap.set('accion', this.activedRoute.snapshot.url[5].path);

    return parametrosUlrMap;
  }

  //consultas
  consultarParatros() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
      this.EquiposMedicionUsado = response.Consultas.filter(equpo => equpo.Grupo == GRUPOS.EQUIPOMEDICIONUTILIZADO);

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
        this.DocumetosRestantes -= this.inspeccion.InspeccionFotos.length;
        console.log(this.inspeccion)
      }, error => {

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

  //elementos seleccionados
  selectItem(event,input) {
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
  limpiar() {
    this.InspeccionEquipoUtilizado.nativeElement.value = '';
    
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


  private asignarDataDesdeElFormulario() {
    //deja el arreglo
    delete this.formulario.value['InspeccionFotos']
    delete this.formulario.value['InspeccionEquipoUtilizado']

    Object.assign(this.inspeccion, this.formulario.value);
  }
  sonValidosLosDatosIngresadosPorElUsuario(formulario: FormGroup) {
    let valido: boolean;

    valido = this.formularioValido(formulario, valido);

    valido = this.documentosSubidosValido(valido);

    valido = this.InspeccionEquipoUtilizadoValido(valido);

    return valido

  }
  private formularioValido(formulario: FormGroup, valido: boolean) {
    formulario.status
      == 'VALID'
      ? valido = true
      : valido = false;
    return valido;
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


  //cargar o inicializar datos del formulario
  iniciarFormulario(inspeccion: InspeccionModel) {
    console.log(inspeccion)
    this.formulario = this.formBuider.group({
      InspeccionFotos: [this.inspeccion.InspeccionFotos?'':'', Validators.required],
      InspeccionEquipoUtilizado: [this.inspeccion.InspeccionEquipoUtilizado],
      Observaciones: [this.inspeccion.Observaciones, Validators.required],
      IntensidadLuzBlanca: [this.inspeccion.IntensidadLuzBlanca, Validators.required],
      InspeccionParticulasMagneticas: [this.inspeccion.InspeccionParticulasMagneticas, Validators.required],
      ConcentracionUtilizada: [this.inspeccion.ConcentracionUtilizada, Validators.required],
      FechaDePreparacion: [this.inspeccion.FechaDePreparacion, Validators.required],
      Lote: [this.inspeccion.Lote, Validators.required],
      InspeccionLuzNegra: [this.inspeccion.InspeccionLuzNegra, Validators.required],
      IntensidadLuzNegra: [this.inspeccion.IntensidadLuzNegra, Validators.required],
      InspeccionYoke: [this.inspeccion.InspeccionYoke, Validators.required],
    });

    this.formulario.valueChanges.subscribe(val => {
      console.log(val)
    })

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
