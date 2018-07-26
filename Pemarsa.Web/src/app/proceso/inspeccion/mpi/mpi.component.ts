import { Component, OnInit, ViewChild } from '@angular/core';
import { AttachmentModel, ProcesoModel, InspeccionModel, InspeccionFotosModel, EntidadModel, CatalogoModel, InspeccionEquipoUtilizadoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_TITULO, ALERTAS_ERROR_MENSAJE, ESTADOS_INSPECCION } from '../../inspeccion-enum/inspeccion.enum';
import { isUndefined } from 'util';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mpi',
  templateUrl: './mpi.component.html',
  styleUrls: ['./mpi.component.css']
})
export class MPIComponent implements OnInit {

  @ViewChild('instance') instance: NgbTypeahead;

  //carga archivos
  private lectorArchivos: FileReader;
  private adjuntos: AttachmentModel[] = [];
  private adjunto: AttachmentModel;
  private DocumetosRestantes: number = 2;

  //procesoInpeccion
  private proceso: ProcesoModel;
  private inspeccion: InspeccionModel = new InspeccionModel();

  //autocompletarEquipoMedicion
  private EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();
  private equipo: CatalogoModel;


  //form
  private formulario: FormGroup;
  private esFormularioValido: Boolean = false;

  constructor(
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
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[2].path);

    return parametrosUlrMap;
  }

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
    this.asignarDataDesdeElFormulario();
    this.actualizarDatos()
  }
  private asignarDataDesdeElFormulario() {
    //deja el arreglo
    delete this.formulario.value['InspeccionEquipoUtilizado']

    Object.assign(this.inspeccion, this.formulario.value);
  }
  sonValidosLosDatosIngresadosPorElUsuario(formulario: FormGroup) {
    let valido: boolean;



    formulario.controls['Observaciones'].status
      != 'VALID'
      ? this.toastrService.error(ALERTAS_ERROR_MENSAJE.Observaciones, ALERTAS_ERROR_TITULO.DatosObligatorios)
      : valido = false;

    formulario.status
      == 'VALID'
      ? valido = true
      : valido = false;

    if (isUndefined(valido)) {
      return valido = true
    }
    return valido

  }
  actualizarDatos() {
    console.log(this.inspeccion)
    console.log(JSON.stringify(this.inspeccion))
    this.procesoService.actualizarInspección(this.inspeccion).subscribe(response => {
      this.toastrService.info(response ? 'ok' : 'error');
    })
  }

  //cargar o inicializar datos del formulario
  iniciarFormulario(inspeccion: InspeccionModel) {
    console.log(inspeccion)
    this.formulario = this.formBuider.group({
      InspeccionFotos: [this.inspeccion.InspeccionFotos],
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
      !this.toastrService.info('ya se cargo este archivo')
    }
    if (files.length > 2) {
      this.toastrService.info('Datos Incorrecto')
      return;
    }

    if (this.DocumetosRestantes <= 0) {
      this.toastrService.info('No se pueden subir más documentos')
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
