import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ALERTAS_ERROR_MENSAJE } from '../../proceso/inspeccion-enum/inspeccion.enum';
import { ConfigService } from '../../common/config/config.service';
import { isNullOrUndefined } from 'util';
import { DomSanitizer } from '@angular/platform-browser';
import { AttachmentModel } from '../../common/models/AttachmentModel';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(this.archivo)) {
      if (!isNullOrUndefined(this.archivo.Nombre)) {
      this.listArchivos.push(this.archivo)
      }
    }


  }
  @ViewChild('fileInput') inputFile: ElementRef;


  @Output() public fileOut = new EventEmitter();
  @Input() public listArchivos: Array<AttachmentModel> = []
  @Input() public archivo: AttachmentModel = new AttachmentModel()
  @Input() public multiplesCargaArchivos: Boolean = false
  @Input() public mostrarImg: Boolean = false
  @Input() public minDocumentos: number
  @Input() public maxDocumentos: number
  @Input() public removibles: boolean
  @Input() public descargable: boolean

  @Input() public tiposArchivosPermitidos: Array<string> = ['png']

  public lectorArchivos: FileReader;
  public path: string = ''


  constructor(
    private toastrService: ToastrService,
    private configService: ConfigService,
    public sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.obtenerRutaServidor();

  }

  obtenerRutaServidor() {
    this.path = this.configService.getConfiguration().webApiBaseUrl;
    this.path = this.path.split("api")[0];

  }

  //carga archivos
  addFile(event: any) {
    console.log(event)
    let files = this.leerArchivo(event);
    if (!files) {
      !this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntos)
    }
    if (this.minDocumentos) {
      if (this.minDocumentos <= 0 || files.length > this.minDocumentos) {
        this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
        return;
      }
    }

    if (this.maxDocumentos) {
      if (this.minDocumentos <= 0 || files.length < this.maxDocumentos) {
        this.toastrService.error(ALERTAS_ERROR_MENSAJE.LimiteDeDocumentosAdjuntosSuperdo)
        return;
      }
    }

    if (files.length > this.minDocumentos) {
      this.toastrService.info(ALERTAS_ERROR_MENSAJE.DocumentosAdjuntosFaltantes)
      return;
    }
    for (var i = 0; i < files.length; i++) {
      this.archivo = this.obtenerDatosArchivoAdjunto(files[i]);
      let extension = this.tiposArchivosPermitidos.find(ext => ext.toLocaleLowerCase() == this.archivo.Extension.toLocaleLowerCase());
      if (!extension) {
        this.toastrService.error('Archivo no valido')

        break;

      }
      this.archivo.Estado = true

      this.listArchivos.push(this.archivo);
      if (!this.multiplesCargaArchivos) {
        files = []
        this.fileOut.emit(this.archivo);

        return


      }
    }
    files = []
    this.fileOut.emit(this.listArchivos);
    this.inputFile.nativeElement.value = "";
  }

  eliminarAdjunto(i) {
    this.listArchivos[i].Estado = false
    if (this.minDocumentos) {
      this.minDocumentos += 1;
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
