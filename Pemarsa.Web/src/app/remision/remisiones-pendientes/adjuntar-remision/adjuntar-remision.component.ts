import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RemisionService } from 'src/app/common/services/entity';
import { RemisionModel, AttachmentModel } from 'src/app/common/models/Index';
import { RemisionPendienteDTO } from 'src/app/common/models/RemisionPendienteDTO';

@Component({
  selector: 'app-adjuntar-remision',
  templateUrl: './adjuntar-remision.component.html',
  styleUrls: ['./adjuntar-remision.component.css']
})
export class AdjuntarRemisionComponent implements OnInit {

  @Output() Adjuntar = new EventEmitter();
  @Input() remision = new RemisionPendienteDTO();
  public remisionModel: RemisionModel = new RemisionModel();
  public Actualizo: boolean = false;
  public planoView: AttachmentModel;
  public Adjunto: AttachmentModel;
  public lectorArchivos: FileReader;

  constructor(
    private remisionService: RemisionService
  ) { }

  ngOnInit() {

  }

  cancelarAction() {
    this.Actualizo = false;
    this.Adjuntar.emit(this.Actualizo);
  }
  confirmarAction() {
    debugger;
    //if (!this.formulario.valid) {
    //  return
    //}
   
    this.crearDocumentoAdjuntoRemision();
  }


  crearDocumentoAdjuntoRemision() {
    debugger;
    this.remisionModel.Guid = this.remision.GuidRemision;
    this.remisionModel.ImagenRemision = this.Adjunto;
    this.remisionService.crearDocumentoAdjuntoRemision(this.remisionModel)
      .subscribe(response => {
      }, errorResponse => {
      }, () => { });
  }

  addDocumentoAdjuntoFormato(event: any) {
    let files = this.leerArchivo(event);
    for (var i = 0; i < files.length; i++) {
      this.planoView = this.obtenerDatosArchivoAdjunto(files[i]);
      this.personaModifica();
      this.Adjunto = this.planoView;
    }

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

  personaModifica() {
    //estos campo debe ser actualizado con la api de seguridad       
    this.planoView.NombreUsuarioCrea = 'Admin';
    this.planoView.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
    this.planoView.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';

  };

  obtenerExtensionArchivo(e: any) {
    return e.currentTarget.result.split(',')[0].split('/')[1].split(';')[0];
  }

  obtenerNombreArchivo(file: File) {
    return file.name;
  }

  obtenerStreamArchivo(e: any) {
    return e.currentTarget.result.split(',')[1];
  }

}
