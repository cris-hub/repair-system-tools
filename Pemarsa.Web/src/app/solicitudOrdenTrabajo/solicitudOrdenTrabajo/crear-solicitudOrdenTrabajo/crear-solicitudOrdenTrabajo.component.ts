import { Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { SolicitudOrdenTrabajoModel, CatalogoModel, ParametrosModel, ClienteModel, PaginacionModel, ClienteLineaModel, AttachmentModel, SolicitudOrdenTrabajoAnexosModel } from "../../../common/models/Index";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { ClienteService, SolicitudOrdenTrabajoService } from "../../../common/services/entity";
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, ObjectUnsubscribedError } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-crear-solicitudOrdenTrabajo',
  templateUrl: './crear-solicitudOrdenTrabajo.component.html'
})
export class CrearSolicitudOrdenTrabajoComponent implements OnInit, OnChanges {

  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('instance') instance: NgbTypeahead;
  @Input() public accion: string[];
  @Input() public solicitudOrdenTrabajoModelInput: SolicitudOrdenTrabajoModel;

  private origen ;

  private esActualizar: boolean = false;
  private esVer: boolean = false;
  private esValido: boolean = false;
  private tieneRemison: boolean = false;


  private solicitudOrdenTrabajoModel: SolicitudOrdenTrabajoModel;
  public Origenes: CatalogoModel[] = new Array<CatalogoModel>();
  public Prioridades: CatalogoModel[] = new Array<CatalogoModel>();
  public Estados: CatalogoModel[] = new Array<CatalogoModel>();
  public Responsables: CatalogoModel[] = new Array<CatalogoModel>();

  private parametros: ParametrosModel;
  private attachments: AttachmentModel[] = new Array<AttachmentModel>();
  private ArchivoRemison: AttachmentModel = new AttachmentModel();



  private frmSolicitudOit: FormGroup;
  public data: any = new Array();
  private paginacion = new PaginacionModel(1, 200);

  private paramsClientes: ParametrosModel;
  private clientes: CatalogoModel[] = new Array<CatalogoModel>();
  private clienteLinea: CatalogoModel[] = new Array<CatalogoModel>();
  private tmpClienteLinea: any = new Array();
  private idSelCliente: number = 0;
  private idSelClienteLinea: number = 0;


  public model: CatalogoModel;
  public model1: CatalogoModel;



  ngOnInit(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accion.currentValue) {
      this.accion = changes.accion.currentValue
    }
    this.solicitudOrdenTrabajoModel = new SolicitudOrdenTrabajoModel();
    this.model = new CatalogoModel();
    this.model1 = new CatalogoModel();
    this.consultarParametros();
    this.consultarParametrosCliente();
    this.initForm();
  }

  constructor(
    private frmBuilder: FormBuilder,
    private parametroSrv: ParametroService,
    private solicitudOrdenTrabajoSrv: SolicitudOrdenTrabajoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,

  ) {

  }

  initForm() {

    if (this.solicitudOrdenTrabajoModelInput) {
      this.model.Valor = this.solicitudOrdenTrabajoModelInput.Cliente.NickName
      this.model.Id = this.solicitudOrdenTrabajoModelInput.Cliente.Id
      this.model1.Valor = this.solicitudOrdenTrabajoModelInput.ClienteLinea.Nombre
      this.model1.Id = this.solicitudOrdenTrabajoModelInput.ClienteLinea.Id
      this.model1.CatalogoId = this.solicitudOrdenTrabajoModelInput.Cliente.Id
      this.attachments = new Array<AttachmentModel>();
      this.ArchivoRemison = new AttachmentModel();
      if (this.solicitudOrdenTrabajoModelInput.RemisionId) {
        this.solicitudOrdenTrabajoSrv.consultarDocumentoAdjuntoPorId(this.solicitudOrdenTrabajoModelInput.RemisionId).subscribe(response => {
          this.ArchivoRemison = response;
        });
      }
    
      this.solicitudOrdenTrabajoModelInput.Anexos.forEach(Anexo => {
        this.solicitudOrdenTrabajoSrv.consultarDocumentoAdjuntoPorId(Anexo.DocumentoAdjuntoId).subscribe(response => {
          this.attachments.push(response);
        });
      });

    } else {
      this.solicitudOrdenTrabajoModelInput = new SolicitudOrdenTrabajoModel();
    }

    this.frmSolicitudOit = this.frmBuilder.group({
      Responsable: [this.solicitudOrdenTrabajoModelInput.Responsable],
      Id: [this.solicitudOrdenTrabajoModelInput.Id],
      Guid: [this.solicitudOrdenTrabajoModelInput.Guid],
      DocumentoAdjunto: [],
      
      OrigenSolicitudId: [this.solicitudOrdenTrabajoModelInput.OrigenSolicitudId],
      Cliente: [this.solicitudOrdenTrabajoModelInput.Cliente.NickName],
      ClienteLinea: [this.solicitudOrdenTrabajoModelInput.ClienteLinea.Nombre],
      Contacto: [this.solicitudOrdenTrabajoModelInput.Contacto],
      PrioridadId: [this.solicitudOrdenTrabajoModelInput.PrioridadId],
      Cotizacion: [this.solicitudOrdenTrabajoModelInput.Cotizacion],
      Cantidad: [this.solicitudOrdenTrabajoModelInput.Cantidad],
      DetallesSolicitud: [this.solicitudOrdenTrabajoModelInput.DetallesSolicitud],
      NombreUsuarioCrea: ['Admin'],//este campo debe ser actualizado con la api de seguridad
      GuidUsuarioCrea: ['00000000-0000-0000-0000-000000000000'],//este campo debe ser actualizado con la api de seguridad
      GuidOrganizacion: ['00000000-0000-0000-0000-000000000000']//este campo debe ser actualizado con la api de seguridad
    });


    if (this.accion[0] == 'Ver') {
      this.esVer = true;
    } else {
      this.esVer = false;
    }
    if (this.accion[0] == 'Procesar') {
      this.esVer = true;
    }

  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("SOLICITUD")
      .subscribe(response => {
        this.parametros = response;
        this.Origenes = response.Catalogos.filter(e => e.Grupo == "ORIGEN_SOLICITUD");
        this.Estados = response.Catalogos.filter(e => e.Grupo == "ESTADOS_SOLICITUD");
        this.Prioridades = response.Catalogos.filter(e => e.Grupo == "PRIORIDAD_SOLICITUD");
        this.Responsables = response.Catalogos.filter(e => e.Grupo == 'RESPONSABLES');
      });
  }

  consultarParametrosCliente() {
    this.parametroSrv.consultarParametrosPorEntidad("CLIENTE")
      .subscribe(response => {
        this.paramsClientes = response;
        this.clientes = this.paramsClientes.Consultas.filter(e => e.Grupo == "cliente");
        this.clienteLinea = this.paramsClientes.Consultas.filter(e => e.Grupo == "clientelinea");
      });
  }


  cambioOrigen(evento) {

    this.tieneRemison = false;
    if (evento == 13) {
      this.tieneRemison = true;
    } 
    console.log(evento,this.origen)
  }
  addFileRemision(event: any) {
    try {
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          let attachment: AttachmentModel = new AttachmentModel();
          attachment.Extension = reader.result.split(',')[0];
          attachment.NombreArchivo = file.name;
          attachment.Nombre = file.name;

          attachment.Stream = reader.result.split(',')[1];

          //estos campo debe ser actualizado con la api de seguridad
          attachment.NombreUsuarioCrea = 'Admin';
          attachment.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
          attachment.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';
          this.ArchivoRemison = attachment;

          if (this.solicitudOrdenTrabajoModel.Remision == null || this.solicitudOrdenTrabajoModel.Remision == undefined) {
            this.solicitudOrdenTrabajoModel.Remision = new AttachmentModel();
          }
          this.solicitudOrdenTrabajoModel.Remision = attachment;
          this.inputFile.nativeElement.value = "";
        }
      }


    } catch (ex) {
    }
  }

  addFile(event: any) {
    try {
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          let attachment: AttachmentModel = new AttachmentModel();
          attachment.Extension = reader.result.split(',')[0];
          attachment.NombreArchivo = file.name;
          attachment.Nombre = file.name;

          attachment.Stream = reader.result.split(',')[1];

          //estos campo debe ser actualizado con la api de seguridad
          attachment.NombreUsuarioCrea = 'Admin';
          attachment.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
          attachment.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';
          this.attachments.push(attachment);
          let solicitudOrdenTrabajoAnexosModel: SolicitudOrdenTrabajoAnexosModel = new SolicitudOrdenTrabajoAnexosModel();
          solicitudOrdenTrabajoAnexosModel.DocumentoAdjunto = attachment;
          solicitudOrdenTrabajoAnexosModel.Estado = true;
          delete solicitudOrdenTrabajoAnexosModel['SolicitudOrdenTrabajo']
          if (this.solicitudOrdenTrabajoModel.Anexos == null || this.solicitudOrdenTrabajoModel.Anexos == undefined) {
            this.solicitudOrdenTrabajoModel.Anexos = new Array<SolicitudOrdenTrabajoAnexosModel>();
          }
          this.solicitudOrdenTrabajoModel.Anexos.push(solicitudOrdenTrabajoAnexosModel);
          this.inputFile.nativeElement.value = "";
        }
      }


    } catch (ex) {
    }
  }

  eliminarAdjunto(adjunto: AttachmentModel) {
    let index: any = this.attachments.findIndex(c => c.Id == adjunto.Id);
    this.attachments.splice(index, 1);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.clientes.filter(v => v.Valor.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  search1 = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200),
      map(term => {
        if (term === '') {
          return []
        }
        if (this.model) {
          let tempClienteLinea: CatalogoModel[] = this.clienteLinea.filter(v => { return (v.Valor.toLowerCase().indexOf(term.toLowerCase()) > -1) }).filter(v => { return v.CatalogoId == this.model.Id }).slice(0, 10)
          return tempClienteLinea;
        } else {
          this.toastr.warning('Por favor seleccione un cliente')
        }
        this.clienteLinea;
      }));

  formatter = (x: { Valor: string }) => x.Valor;

  cambioItemEvent(event) {
    //.log(event);
    /*if (event != undefined) {
      this.tmpClienteLinea = new Array<CatalogoModel>();
      let tmpCliente = this.clientes.find(e => e.Guid == event.item.Guid);
      this.tmpClienteLinea = this.clienteLinea.filter(e => e.CatalogoId == tmpCliente.Id &&  e.Grupo == "clientelinea");
    }*/
  }

  enviarFormulario(datosFormulario) {
    if (this.accion[0] == 'Crear') {
      this.crearSolicitudOit(datosFormulario);
      this.attachments = new Array<AttachmentModel>();
    }

    if (this.accion[0] == 'Editar') {
      this.ActualizarSolcitudDeTrabajo(datosFormulario);
    }
    if (this.accion[0] == 'Procesar') {
      this.procesarSolitudOit(datosFormulario);
    }
  }


  crearSolicitudOit(datosFormulario) {
    Object.assign(this.solicitudOrdenTrabajoModel, datosFormulario);


    this.solicitudOrdenTrabajoModel.ClienteId = this.solicitudOrdenTrabajoModel.Cliente.Id;
    this.solicitudOrdenTrabajoModel.LineaId = this.solicitudOrdenTrabajoModel.ClienteLinea.Id;
    delete this.solicitudOrdenTrabajoModel['Cliente']
    delete this.solicitudOrdenTrabajoModel['ClienteLinea']
    if (!this.solicitudOrdenTrabajoModel.Id) {
      delete this.solicitudOrdenTrabajoModel['Id']
      delete this.solicitudOrdenTrabajoModel['Guid']


    }
    this.solicitudOrdenTrabajoSrv.crearSolicitudOit(this.solicitudOrdenTrabajoModel).subscribe(response => {
      this.toastr.info(JSON.stringify(response));
    });
  }

  ActualizarSolcitudDeTrabajo(datosFormulario) {
    Object.assign(this.solicitudOrdenTrabajoModel, datosFormulario);
    this.solicitudOrdenTrabajoModel.ClienteId = this.solicitudOrdenTrabajoModel.Cliente.Id;
    this.solicitudOrdenTrabajoModel.LineaId = this.solicitudOrdenTrabajoModel.ClienteLinea.Id;
    delete this.solicitudOrdenTrabajoModel['Cliente']
    delete this.solicitudOrdenTrabajoModel['ClienteLinea']
    if (!this.solicitudOrdenTrabajoModel.Id) {
      delete this.solicitudOrdenTrabajoModel['Id']

    }
    this.solicitudOrdenTrabajoSrv.ActualizarSolcitudDeTrabajo(this.solicitudOrdenTrabajoModel).subscribe(response => {
      this.toastr.info(JSON.stringify(response));

    });
    this.router.navigate(['/solicitudOrdenTrabajo']);
  }


  procesarSolitudOit(datosFormulario) {
    this.router.navigate(['/oit/' + datosFormulario.Guid + '/procesar']);
  }

  consultarSolicitudDeTrabajoPorGuid(Guid: string) {
    this.solicitudOrdenTrabajoSrv.consultarSolicitudDeTrabajoPorGuid(Guid).subscribe(response => this.solicitudOrdenTrabajoModel = response);
  }

}
