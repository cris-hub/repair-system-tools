import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentModel, ProcesoModel, InspeccionModel, EntidadModel, CatalogoModel, InspeccionEquipoUtilizadoModel, InspeccionFotosModel, InspeccionInsumoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_MENSAJE, ALERTAS_ERROR_TITULO, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE } from '../../inspeccion-enum/inspeccion.enum';
import { debounceTime, map } from 'rxjs/operators';
import { isUndefined } from 'util';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lpi',
  templateUrl: './lpi.component.html',
  styleUrls: ['./lpi.component.css']
})
export class LPIComponent implements OnInit {

  @ViewChild('instance') instance: NgbTypeahead;

  //carga archivos
  private lectorArchivos: FileReader;
  private adjuntos: AttachmentModel[] = [];
  private adjunto: AttachmentModel;
  private DocumetosRestantes: number = 5;
  private DocumetoMinimos: number = 1;


  //procesoInpeccion
  private proceso: ProcesoModel;
  private inspeccion: InspeccionModel = new InspeccionModel();

  //catalogos
  private TiposLiquidos: EntidadModel[];
  private TiposInsumos: EntidadModel[];
  //autocompletarEquipoMedicion
  private EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();
  private equipo: CatalogoModel;


  //form
  private formularioInsumos: FormArray;
  private formulario: FormGroup;
  private esFormularioValido: Boolean = false;

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
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[2].path);

    return parametrosUlrMap;
  }

  consultarParatros() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
      this.TiposInsumos = response.Catalogos.filter(equpo => equpo.Grupo == GRUPOS.TIPOINSUMO);
      this.TiposLiquidos = response.Catalogos.filter(equpo => equpo.Grupo == GRUPOS.TIPOSLIQUIDOS);
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
        this.DocumetoMinimos = this.inspeccion.InspeccionFotos.length > 0 ? 0 : 1;
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



  //persistir
  procesar() {
    this.asignarDataDesdeElFormulario();
    this.esFormularioValido = this.sonValidosLosDatosIngresadosPorElUsuario(this.formulario);
    if (this.esFormularioValido) {
      this.actualizarDatos()
    }
  }
  private asignarDataDesdeElFormulario() {
    //deja el arreglo
    delete this.formulario.value['InspeccionEquipoUtilizado'];
    delete this.formulario.value['InspeccionFotos'];

    Object.assign(this.inspeccion, this.formulario.value);
    delete this.formulario.controls['InspeccionFotos']

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
    if (this.inspeccion.InspeccionFotos.length < this.DocumetoMinimos) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes);
      valido = false;
    } else {
      this.DocumetoMinimos = 0
    }
    return valido;
  }

  actualizarDatos() {
    this.loaderService.display(true)
    this.procesoService.actualizarInspección(this.inspeccion).subscribe(
      response => {
        response ?
          this.toastrService.success(ALERTAS_OK_MENSAJE.InspeccionActualizada) :
          this.toastrService.error(ALERTAS_ERROR_MENSAJE.InspeccionERRORactualizar);
        this.loaderService.display(false)
        this.location.back();
      }, error => {
        this.toastrService.error(error.messge);
        this.loaderService.display(false)
      }, () => {
        this.loaderService.display(false)
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
      TemperaturaDePieza: [this.inspeccion.TemperaturaDePieza, Validators.required],
      TemperaturaAmbiente: [this.inspeccion.TemperaturaAmbiente, Validators.required],
      TipoDeLiquidosId: [this.inspeccion.TipoDeLiquidosId, Validators.required],
      Insumos: this.formBuider.array([])
    });

    this.crearFormularioInsumos()
  }
  crearFormularioInsumos(): any {

    if (!this.formulario) {
      return
    }

    this.formularioInsumos = this.formulario.get('Insumos') as FormArray;




    while (this.inspeccion.Insumos.length < 3) {
      this.inspeccion.Insumos.push(new InspeccionInsumoModel())

    }



    this.inspeccion.Insumos.forEach(p => {
      let form = this.formBuider.group({});

      form.addControl('TipoInsumoId', new FormControl(p.TipoInsumoId, Validators.required));
      form.addControl('NumeroLote', new FormControl(p.NumeroLote, Validators.required));



      this.formularioInsumos.push(form);
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

      if (this.DocumetosRestantes == 5) {
        this.DocumetoMinimos -= 1
      }
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
