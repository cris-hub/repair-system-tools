import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService, Toast } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined, isUndefined } from 'util';
import { TIPO_INSPECCION, ALERTAS_ERROR_MENSAJE, ALERTAS_ERROR_TITULO, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { Location } from '@angular/common';
import { ProcesoInspeccion } from '../../../common/models/ProcesoInspeccionModel';
import { ProcesoModel } from '../../../common/models/ProcesoModel';
import { AttachmentModel } from '../../../common/models/AttachmentModel';
import { InspeccionFotosModel } from '../../../common/models/InspeccionFotosModel';
import { InspeccionModel } from '../../../common/models/InspeccionModel';

@Component({
  selector: 'app-vr',
  templateUrl: './vr.component.html',
  styleUrls: ['./vr.component.css']
})
export class VRComponent implements OnInit {

  //carga archivos
  public  lectorArchivos: FileReader;
  public  adjuntos: AttachmentModel[] = [];
  public  adjunto: AttachmentModel;
  public  DocumetosRestantes: number = 2;

  //procesoInpeccion
  public  proceso: ProcesoModel;
  public  inspeccion: InspeccionModel = new InspeccionModel();

  //form
  public  formInpeccionVR: FormGroup;
  public  esFormularioValido: Boolean = false;

  constructor(
    private location: Location,

    private procesoService: ProcesoService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit() {

    this.consultarProceso();

  }

  //consultas
  consultarProceso() {
    this.iniciarFormulario(new InspeccionModel());
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response

        let inspeccionEntrada: ProcesoInspeccion = response.ProcesoInspeccion.find(c => {
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

  //parametrosUri
  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    parametrosUlrMap.set('pieza', this.activedRoute.snapshot.paramMap.get('index'));
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[0].path);
    parametrosUlrMap.set('accion', this.activedRoute.snapshot.url[3].path);

    return parametrosUlrMap;
  }


  //persistir
  private asignarDataDesdeElFormulario() {
    delete this.formInpeccionVR.value['InspeccionFotos']

    Object.assign(this.inspeccion, this.formInpeccionVR.value);
  }
  procesar() {
    this.procesoService.iniciarProcesar = true
    this.asignarDataDesdeElFormulario();
    this.esFormularioValido = this.sonValidosLosDatosIngresadosPorElUsuario(this.formInpeccionVR);
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
    if (this.proceso.ProcesoInspeccion.filter(d => d.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA).every(d => d.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA)) {
      this.procesoService.actualizarEstadoProceso(this.proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
        if (response) {
          this.router.navigate(['inspeccion/entrada'])
        };
      });
    }
  }



  //Validacion
  sonValidosLosDatosIngresadosPorElUsuario(formulario: FormGroup) {
    let valido: boolean;

    valido = this.formularioValido(formulario, valido);

    valido = this.documentosSubidosValido(valido);


    return valido

  }
  private documentosSubidosValido(valido: boolean) {
    if (this.inspeccion.InspeccionFotos.length < this.DocumetosRestantes) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes);
      valido = false;
    }
    return valido;
  }
  private formularioValido(formulario: FormGroup, valido: boolean) {
    formulario.controls['Observaciones'].status
      != 'VALID'
      ? this.toastrService.error(ALERTAS_ERROR_MENSAJE.Observaciones, ALERTAS_ERROR_TITULO.DatosObligatorios)
      : valido = false;
    formulario.status
      == 'VALID'
      ? valido = true
      : valido = false;
    return valido;
  }

  //cargar o inicializar datos del formulario
  iniciarFormulario(inspeccion: InspeccionModel) {
    this.formInpeccionVR = this.formBuider.group({
      InspeccionFotos: [this.inspeccion.InspeccionFotos, Validators.required],
      Observaciones: [this.inspeccion.Observaciones, Validators.required]
    });
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
