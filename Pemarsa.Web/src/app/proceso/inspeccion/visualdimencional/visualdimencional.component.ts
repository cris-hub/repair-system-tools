import { Component, OnInit } from '@angular/core';
import { AttachmentModel, InspeccionModel, ProcesoModel, InspeccionFotosModel } from '../../../common/models/Index';
import { ProcesoService } from '../../../common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION } from '../../inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-visualdimencional',
  templateUrl: './visualdimencional.component.html',
  styleUrls: ['./visualdimencional.component.css']
})
export class VisualDimensionalComponent implements OnInit {
  //carga archivos
  private lectorArchivos: FileReader;
  private adjuntos: AttachmentModel[] = [];
  private adjunto: AttachmentModel;
  private DocumetosRestantes: number = 2;

  //procesoInpeccion
  private proceso: ProcesoModel;
  private inspeccion: InspeccionModel = new InspeccionModel();

  constructor(
    private procesoService: ProcesoService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.consultarProceso();
  }

  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    parametrosUlrMap.set('pieza', this.activedRoute.snapshot.paramMap.get('index'));
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[2].path);

    return parametrosUlrMap;
  }

  consultarProceso() {
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {

        let inspeccionEntrada: ProcesoInspeccionEntradaModel = response.InspeccionEntrada.find(c => {
          return c.Inspeccion.TipoInspeccionId == TIPO_INSPECCION[this.obtenerParametrosRuta().get('tipoInspeccion')]
        });
        this.inspeccion = inspeccionEntrada.Inspeccion;
        this.DocumetosRestantes -= this.inspeccion.InspeccionFotos.length;
        console.log(this.inspeccion)
      });
  }
  procesar() {
    this.procesoService.actualizarInspección(this.inspeccion).subscribe(response => {
      this.toastrService.info(response ? 'ok' : 'error');
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
