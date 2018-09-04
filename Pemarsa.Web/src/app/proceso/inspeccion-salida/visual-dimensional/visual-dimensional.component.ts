import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProcesoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { TIPO_INSPECCION, ALERTAS_ERROR_TITULO, ALERTAS_ERROR_MENSAJE, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ProcesoInspeccion } from '../../../common/models/ProcesoInspeccionModel';
import { InspeccionModel } from '../../../common/models/InspeccionModel';
import { AttachmentModel } from '../../../common/models/AttachmentModel';
import { ProcesoModel } from '../../../common/models/ProcesoModel';
import { EntidadModel } from '../../../common/models/EntidadDTOModel';
import { CatalogoModel } from '../../../common/models/CatalogoModel';
import { InspeccionDimensionalOtroModel } from '../../../common/models/InspeccionDimensionalOtroModel';
import { InspeccionEquipoUtilizadoModel } from '../../../common/models/InspeccionEquipoUtilizadoModel';
import { InspeccionFotosModel } from '../../../common/models/InspeccionFotosModel';

@Component({
  selector: 'app-visual-dimensional',
  templateUrl: './visual-dimensional.component.html',
  styleUrls: ['./visual-dimensional.component.css']
})
export class VisualDimensionalComponent implements OnInit {

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

  public  EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();




  //form
  public  formInpeccionVisualDimensional: FormGroup;
  public  esFormularioValido: Boolean = false;
  public  esVer: Boolean = false;
  public  formDimensionales: FormArray;

  //autoCompletar
  public  equipo: CatalogoModel;


  constructor(
    private location: Location,
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private loaderService: LoaderService
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
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso  = response
        let ProcesoInspeccionSalida: ProcesoInspeccion = response.ProcesoInspeccion.find(c => {
          return (
            c.Inspeccion.TipoInspeccionId
            == TIPO_INSPECCION[this.obtenerParametrosRuta().get('tipoInspeccion')]
            && c.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO)
        });
        this.inspeccion = ProcesoInspeccionSalida.Inspeccion;
        this.DocumetosRestantes -= this.inspeccion.InspeccionFotos.length;
        console.log(this.inspeccion)
        this.loaderService.display(false)
      }, error => {

      }, () => {


        this.inspeccion ? this.iniciarFormulario(this.inspeccion) : this.iniciarFormulario(new InspeccionModel());

      });
  }
  consultarParatros() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {

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
    if (this.proceso.ProcesoInspeccion.filter(d => d.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA).every(d => d.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA)) {
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
      ObservacionesInspeccion: [this.inspeccion.ObservacionesInspeccion, Validators.required],
      InspeccionEquipoUtilizado: [this.inspeccion.InspeccionEquipoUtilizado, Validators.required],
      Dimensionales: this.formBuider.array([])
    });
    this.crearFormDimensiones()
  }
  private asignarDataDesdeElFormulario() {
    delete this.formInpeccionVisualDimensional.value['InspeccionFotos']
    delete this.formInpeccionVisualDimensional.value['InspeccionEquipoUtilizado']

    Object.assign(this.inspeccion, this.formInpeccionVisualDimensional.value);
    delete this.formInpeccionVisualDimensional.controls['InspeccionFotos']

  }


  crearFormDimensiones(): any {

    if (!this.formInpeccionVisualDimensional) {
      return
    }

    this.formDimensionales = this.formInpeccionVisualDimensional.get('Dimensionales') as FormArray;




    while (this.inspeccion.Dimensionales.length < 3) {
      this.inspeccion.Dimensionales.push(new InspeccionDimensionalOtroModel())

    }

    this.inspeccion.Dimensionales.forEach(p => {
      let form = this.formBuider.group({});

      form.addControl('Tolerancia', new FormControl(p.Tolerancia, Validators.required));
      form.addControl('MedidaActual', new FormControl(p.MedidaActual, Validators.required));
      form.addControl('MedidaNominal', new FormControl(p.MedidaNominal, Validators.required));
      form.addControl('Conformidad', new FormControl(p.MedidaNominal, Validators.required));

      this.formDimensionales.push(form);
    })




  }


  addItemFormDimensional(): void {
    this.formDimensionales = this.formInpeccionVisualDimensional.get('Dimensionales') as FormArray;
    this.formDimensionales.push(this.crearFormFormaDimensional());
    console.log(this.formDimensionales);
  }
  removeItemFormDimensional(i) {
    this.formDimensionales.removeAt(i);
  }
  crearFormFormaDimensional(): any {
    let formatoParametrosModel = this.formBuider.group({
      MedidaNominal: '',
      MedidaActual: '',
      Tolerancia: '',
      Conformidad: '',
    });


    return formatoParametrosModel;
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
  private InspeccionEquipoUtilizadoValido(valido: boolean) {
    if (this.inspeccion.InspeccionEquipoUtilizado.length < 1) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.EquipoMedicion);
      valido = false;
    }
    return valido;
  }
  private documentosSubidosValido(valido: boolean) {
    if (this.inspeccion.InspeccionFotos.length < this.DocumetosRestantes) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes);
      valido = false;
    }
    return valido;
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
        //this.
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
