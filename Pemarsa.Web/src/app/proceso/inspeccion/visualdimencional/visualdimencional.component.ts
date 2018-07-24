import { Component, OnInit, ViewChild } from '@angular/core';
import { AttachmentModel, InspeccionModel, ProcesoModel, InspeccionFotosModel, InspeccionConexionModel, ParametrosModel, EntidadModel, CatalogoModel, InspeccionEquipoUtilizadoModel } from '../../../common/models/Index';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_MENSAJE, ALERTAS_ERROR_TITULO } from '../../inspeccion-enum/inspeccion.enum';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { isUndefined } from 'util';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visualdimencional',
  templateUrl: './visualdimencional.component.html',
  styleUrls: ['./visualdimencional.component.css']
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
  private Conexiones: EntidadModel[] = new Array<EntidadModel>();
  private EstadosConexion: EntidadModel[] = new Array<EntidadModel>();
  private TiposConexion: EntidadModel[] = new Array<EntidadModel>();
  private EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();




  //form
  private formInpeccionVisualDimensional: FormGroup;
  private esFormularioValido: Boolean = false;
  private esVer: Boolean = false;
  private formConexiones: FormArray;

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
          return c.Inspeccion.TipoInspeccionId == TIPO_INSPECCION[this.obtenerParametrosRuta().get('tipoInspeccion')]
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
      this.Conexiones = response.Consultas.filter(conexion => conexion.Grupo == GRUPOS.CONEXION);
      this.EstadosConexion = response.Consultas.filter(estados => estados.Grupo == GRUPOS.ESTADOSCONEXIONBOX || estados.Grupo == GRUPOS.ESTADOSCONEXIONPIN);
      this.TiposConexion = response.Consultas.filter(tipos => tipos.Grupo == GRUPOS.TIPOCONEXION);
      this.EquiposMedicionUsado = response.Consultas.filter(equpo => equpo.Grupo == GRUPOS.EQUIPOMEDICIONUTILIZADO);

    })
  }



  //actualizaciones
  actualizarDatos() {
    this.procesoService
      .actualizarInspección(this.inspeccion)
      .subscribe(response => {
        this.toastrService.info(response ? 'ok' : 'error');
      })
  }

  procesar() {
    
    this.esFormularioValido = this.sonValidosLosDatosIngresadosPorElUsuario(this.formInpeccionVisualDimensional);
    this.asignarDataDesdeElFormulario();
    if (this.esFormularioValido) {
      this.actualizarDatos()
    }
  }



  //cargar o inicializar datos del formulario
  iniciarFormulario(inspeccion: InspeccionModel) {
    this.formInpeccionVisualDimensional = this.formBuider.group({
      InspeccionFotos: [this.inspeccion.InspeccionFotos],
      Observaciones: [this.inspeccion.Observaciones, Validators.required],
      IntensidadLuzBlanca: [this.inspeccion.IntensidadLuzBlanca, Validators.required],
      InspeccionEquipoUtilizado: [this.inspeccion.InspeccionEquipoUtilizado, Validators.required],
      
      Conexiones: this.formBuider.array([])
    });
    this.crearFormConexiones()
  }
  private asignarDataDesdeElFormulario() {
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
    
    

    this.inspeccion.Conexiones.forEach(p => {
      let form = this.formBuider.group({});
      form.addControl('NumeroConexion', new FormControl(posicion += 1));
      form.addControl('ConexionId', new FormControl(p.ConexionId));
      form.addControl('TipoConexionId', new FormControl(p.TipoConexionId));
      form.addControl('EstadoId', new FormControl(p.EstadoId));
      form.addControl('Observaciones', new FormControl(p.Observaciones));
      this.formConexiones.push(form);
    })




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
