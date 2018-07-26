import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentModel, ProcesoModel, InspeccionModel, EntidadModel, CatalogoModel, InspeccionEquipoUtilizadoModel } from '../../../common/models/Index';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ALERTAS_ERROR_TITULO, ALERTAS_ERROR_MENSAJE, ESTADOS_INSPECCION } from '../../inspeccion-enum/inspeccion.enum';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { isUndefined } from 'util';

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
  private DocumetosRestantes: number = 4;

  //procesoInpeccion
  private proceso: ProcesoModel;
  private inspeccion: InspeccionModel = new InspeccionModel();

  //catalogos
  private TubosPatrones: EntidadModel[];



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
      Observaciones: [inspeccion.Observaciones],
      TuboPatronId: [inspeccion.TuboPatronId],
      EstaConforme: [inspeccion.EstaConforme],
    });


  }




  //carga archivos
  addFileUltrasonido(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info('ya se cargo este archivo')
    }
    if (files.length > this.DocumetosRestantes) {
      this.toastrService.info('Datos Incorrecto')
      return;
    }

    if (this.DocumetosRestantes <= 0) {
      this.toastrService.info('No se pueden subir más documentos')
      return;
    }

    for (var i = 0; i < files.length; i++) {
      let docEspesores = new AttachmentModel();
      docEspesores = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenPantallaUltrasonido = docEspesores
      this.DocumetosRestantes -= 1;

    }



  }

  addFilePreviaUltrasonido(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info('ya se cargo este archivo')
    }
    if (files.length > this.DocumetosRestantes) {
      this.toastrService.info('Datos Incorrecto')
      return;
    }

    if (this.DocumetosRestantes <= 0) {
      this.toastrService.info('No se pueden subir más documentos')
      return;
    }

    for (var i = 0; i < files.length; i++) {
      let docEspesores = new AttachmentModel();
      docEspesores = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenUltrasonidoPrevia = docEspesores
      this.DocumetosRestantes -= 1;

    }



  }

  addFileDuranteInspeccionUltrasonido(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info('ya se cargo este archivo')
    }
    if (files.length > this.DocumetosRestantes) {
      this.toastrService.info('Datos Incorrecto')
      return;
    }

    if (this.DocumetosRestantes <= 0) {
      this.toastrService.info('No se pueden subir más documentos')
      return;
    }

    for (var i = 0; i < files.length; i++) {
      let docEspesores = new AttachmentModel();
      docEspesores = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenUltrasonidoDurante = docEspesores
      this.DocumetosRestantes -= 1;

    }



  }

  addFileDespuesInspeccionUltrasonido(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info('ya se cargo este archivo')
    }
    if (files.length > this.DocumetosRestantes) {
      this.toastrService.info('Datos Incorrecto')
      return;
    }

    if (this.DocumetosRestantes <= 0) {
      this.toastrService.info('No se pueden subir más documentos')
      return;
    }

    for (var i = 0; i < files.length; i++) {
      let docMFL = new AttachmentModel();
      docMFL = this.obtenerDatosArchivoAdjunto(files[i]);
      this.inspeccion.ImagenUltrasonidoDespues = docMFL
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
