import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentModel, ProcesoModel, InspeccionModel, EntidadModel, CatalogoModel, InspeccionEquipoUtilizadoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_TITULO, ALERTAS_ERROR_MENSAJE, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE } from '../../inspeccion-enum/inspeccion.enum';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { isUndefined } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-uta',
  templateUrl: './uta.component.html',
  styleUrls: ['./uta.component.css']
})
export class UTAComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;

  //carga archivos
  private lectorArchivos: FileReader;
  private adjuntos: AttachmentModel[] = [];
  private adjunto: AttachmentModel;
  private DocumetosRestantesImagenUltrasonidoDespues: number = 1;
  private DocumetosRestantesImagenPantallaUltrasonido: number = 1;
  private DocumetosRestantesImagenUltrasonidoDurante: number = 1;
  private DocumetosRestantesImagenUltrasonidoPrevia: number = 1;
  private DocumetosRestantes =
    this.DocumetosRestantesImagenUltrasonidoDespues
    + this.DocumetosRestantesImagenPantallaUltrasonido
    + this.DocumetosRestantesImagenUltrasonidoDurante
    + this.DocumetosRestantesImagenUltrasonidoPrevia



  //procesoInpeccion
  private proceso: ProcesoModel;
  private inspeccion: InspeccionModel = new InspeccionModel();

  //catalogos
  private TubosPatrones: EntidadModel[];



  //form

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
      this.TubosPatrones = response.Catalogos.filter(equpo => equpo.Grupo == GRUPOS.TUBOSPATRONES);
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





  //persistir

  procesar() {

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

  private asignarDataDesdeElFormulario() {
    //deja el arreglo
    delete this.formulario.value['InspeccionEquipoUtilizado']
    delete this.formulario.value['ImagenUltrasonidoDespues']
    delete this.formulario.value['ImagenPantallaUltrasonido']
    delete this.formulario.value['ImagenUltrasonidoDurante']
    delete this.formulario.value['ImagenUltrasonidoPrevia']
    delete this.formulario.value['ImagenUltrasonidoPrevia']

    Object.assign(this.inspeccion, this.formulario.value);
  }
  sonValidosLosDatosIngresadosPorElUsuario(formulario: FormGroup) {
    let valido: boolean;

    valido = this.formularioValido(formulario, valido);

    valido = this.documentosSubidosValido(valido);

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
    if (!this.inspeccion.ImagenPantallaUltrasonido
      || !this.inspeccion.ImagenUltrasonidoPrevia
      || !this.inspeccion.ImagenUltrasonidoDurante
      || !this.inspeccion.ImagenUltrasonidoDespues
    ) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes);
      valido = false;
    }
    return valido;
  }

  //cargar o inicializar datos del formulario
  iniciarFormulario(inspeccion: InspeccionModel) {
    console.log(inspeccion)
    this.formulario = this.formBuider.group({
      ImagenUltrasonidoDespues: [inspeccion.ImagenUltrasonidoDespues, Validators.required],
      ImagenUltrasonidoDurante: [inspeccion.ImagenUltrasonidoDurante, Validators.required],
      ImagenUltrasonidoPrevia: [inspeccion.ImagenUltrasonidoPrevia, Validators.required],
      ImagenPantallaUltrasonido: [inspeccion.ImagenPantallaUltrasonido, Validators.required],
      Observaciones: [inspeccion.Observaciones, Validators.required],
      TuboPatronId: [inspeccion.TuboPatronId, Validators.required],
      EstaConforme: [inspeccion.EstaConforme, Validators.required],
    });


  }




  //carga archivos
  addFileUltrasonido(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos)
    }
    if (this.DocumetosRestantesImagenPantallaUltrasonido <= 0) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
      return;
    }
    if (files.length > this.DocumetosRestantesImagenPantallaUltrasonido) {
      this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes)
      return;
    }


    for (var i = 0; i < files.length; i++) {
      let docEspesores = new AttachmentModel();
      docEspesores = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenPantallaUltrasonido = docEspesores
      this.DocumetosRestantesImagenPantallaUltrasonido -= 1;

    }



  }

  addFilePreviaUltrasonido(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos)
    }
    if (this.DocumetosRestantesImagenUltrasonidoPrevia <= 0) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
      return;
    }
    if (files.length > this.DocumetosRestantesImagenUltrasonidoPrevia) {
      this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes)
      return;
    }


    for (var i = 0; i < files.length; i++) {
      let docEspesores = new AttachmentModel();
      docEspesores = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenUltrasonidoPrevia = docEspesores
      this.DocumetosRestantesImagenUltrasonidoPrevia -= 1;

    }



  }

  addFileDuranteInspeccionUltrasonido(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos)
    }
    if (this.DocumetosRestantesImagenUltrasonidoDurante <= 0) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
      return;
    }
    if (files.length > this.DocumetosRestantesImagenUltrasonidoDurante) {
      this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes)
      return;
    }


    for (var i = 0; i < files.length; i++) {
      let docEspesores = new AttachmentModel();
      docEspesores = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenUltrasonidoDurante = docEspesores
      this.DocumetosRestantesImagenUltrasonidoDurante -= 1;

    }



  }

  addFileDespuesInspeccionUltrasonido(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos)
    }
    if (this.DocumetosRestantesImagenUltrasonidoDespues <= 0) {
      this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
      return;
    }
    if (files.length > this.DocumetosRestantesImagenUltrasonidoDespues) {
      this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes)
      return;
    }



    for (var i = 0; i < files.length; i++) {
      let docMFL = new AttachmentModel();
      docMFL = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenUltrasonidoDespues = docMFL
      this.DocumetosRestantesImagenUltrasonidoDespues -= 1;
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
