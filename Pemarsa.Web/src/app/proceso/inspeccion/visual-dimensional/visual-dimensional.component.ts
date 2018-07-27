import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentModel, ProcesoModel, InspeccionModel, EntidadModel, CatalogoModel, InspeccionConexionModel, InspeccionEquipoUtilizadoModel, InspeccionFotosModel, InspeccionDimensionalOtroModel } from '../../../common/models/Index';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProcesoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_TITULO, ALERTAS_ERROR_MENSAJE, ESTADOS_INSPECCION } from '../../inspeccion-enum/inspeccion.enum';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-visual-dimensional',
  templateUrl: './visual-dimensional.component.html',
  styleUrls: ['./visual-dimensional.component.css']
})
export class VisualDimensionalComponent implements OnInit {

  @ViewChild('instance') instance: NgbTypeahead;


  //carga archivos
  private lectorArchivos: FileReader;
  private adjuntos: AttachmentModel[] = [];
  private adjunto: AttachmentModel;
  private DocumetosRestantes: number = 2;

  //procesoInpeccion
  private proceso: ProcesoModel;
  private inspeccion: InspeccionModel = new InspeccionModel();



  //catalogos

  private EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();




  //form
  private formInpeccionVisualDimensional: FormGroup;
  private esFormularioValido: Boolean = false;
  private esVer: Boolean = false;
  private formDimensionales: FormArray;

  //autoCompletar
  private equipo: CatalogoModel;


  constructor(
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
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[2].path);

    return parametrosUlrMap;
  }

  //consultas
  consultarProceso() {
    this.iniciarFormulario(new InspeccionModel());

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

    this.esFormularioValido = this.sonValidosLosDatosIngresadosPorElUsuario(this.formInpeccionVisualDimensional);
    this.asignarDataDesdeElFormulario();
  
      this.actualizarDatos()
    
  }
  actualizarDatos() {
    this.procesoService
      .actualizarInspección(this.inspeccion)
      .subscribe(response => {
        this.toastrService.info(response ? 'ok' : 'error');
      })
  }



  //cargar o inicializar datos del formulario
  iniciarFormulario(inspeccion: InspeccionModel) {
    this.formInpeccionVisualDimensional = this.formBuider.group({
      InspeccionFotos: [this.inspeccion.InspeccionFotos],
      Observaciones: [this.inspeccion.Observaciones, Validators.required],
      IntensidadLuzBlanca: [this.inspeccion.IntensidadLuzBlanca, Validators.required],
      ObservacionesInspeccion: [this.inspeccion.ObservacionesInspeccion, Validators.required],
      InspeccionEquipoUtilizado: [this.inspeccion.InspeccionEquipoUtilizado, Validators.required],
      Dimensionales: this.formBuider.array([])
    });
    this.crearFormDimensiones()
  }
  private asignarDataDesdeElFormulario() {
    delete this.formInpeccionVisualDimensional.value['InspeccionEquipoUtilizado']
    Object.assign(this.inspeccion, this.formInpeccionVisualDimensional.value);
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
      
      form.addControl('Tolerancia', new FormControl(p.Tolerancia));
      form.addControl('MedidaActual', new FormControl(p.MedidaActual));
      form.addControl('MedidaNominal', new FormControl(p.MedidaNominal));
      form.addControl('Conformidad', new FormControl(p.MedidaNominal));
      
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

    formulario.controls['InspeccionFotos'].status
      != 'VALID'
      ? this.toastrService.error(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos, ALERTAS_ERROR_TITULO.DatosObligatorios)
      : valido = true;

    formulario.controls['Observaciones'].status
      != 'VALID'
      ? this.toastrService.error(ALERTAS_ERROR_MENSAJE.Observaciones, ALERTAS_ERROR_TITULO.DatosObligatorios)
      : valido = true;

    formulario.status
      == 'VALID'
      ? valido = true
      : valido = false;

    return valido

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
      inspeccionFotos.Pieza = this.obtenerParametrosRuta().get('pieza') ? parseInt(this.obtenerParametrosRuta().get('pieza'), 10) : 1;
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
