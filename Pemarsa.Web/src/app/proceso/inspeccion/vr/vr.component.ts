import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { AttachmentModel } from '../../../common/models/Index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vr',
  templateUrl: './vr.component.html',
  styleUrls: ['./vr.component.css']
})
export class VrComponent implements OnInit {

  private lectorArchivos: FileReader;

  private adjuntos: AttachmentModel[]=[];
  private adjunto: AttachmentModel;
  private DocumetosRestantes: number = 2;
  constructor(
    private procesoService: ProcesoService,
    private toastService:ToastrService
  ) {

  }

  ngOnInit() {
    
  }

  addFile(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastService.info('ya se cargo este archivo')
    }
    if (files.length > 2) {
      this.toastService.info('Datos Incorrecto')
      return;
    }

    if (this.DocumetosRestantes <= 0) {
      this.toastService.info('No se pueden subir más documentos')
      return;
    }

    for (var i = 0; i < files.length; i++) {
      this.adjunto = this.obtenerDatosArchivoAdjunto(files[i]);
      
      this.adjuntos.push(this.adjunto);

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
