import { Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from "@angular/forms";
import { SolicitudOrdenTrabajoModel, CatalogoModel, ParametrosModel, ClienteModel, PaginacionModel, ClienteLineaModel, AttachmentModel, SolicitudOrdenTrabajoAnexosModel } from "../../../common/models/Index";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { ClienteService, SolicitudOrdenTrabajoService } from "../../../common/services/entity";
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, ObjectUnsubscribedError } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ConfirmacionComponent } from "../../../common/directivas/confirmacion/confirmacion.component";


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-crear-solicitudOrdenTrabajo',
  templateUrl: './crear-solicitudOrdenTrabajo.component.html'
})
export class CrearSolicitudOrdenTrabajoComponent implements OnInit, OnChanges {

  @ViewChild(ConfirmacionComponent) public confirmar: ConfirmacionComponent;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('instance') instance: NgbTypeahead;
  @Input() public accion: string[];
  @Input() public solicitudOrdenTrabajoModelInput: SolicitudOrdenTrabajoModel;
  @Output() public accionEvento = new EventEmitter();

  public origen;

  public esActualizar: boolean = false;
  public esVer: boolean = false;
  public esValido: boolean = false;
  public tieneRemison: boolean = false;
  public abrirModal: boolean = false;

  public solicitudOrdenTrabajoModel: SolicitudOrdenTrabajoModel;
  public Origenes: CatalogoModel[] = new Array<CatalogoModel>();
  public Prioridades: CatalogoModel[] = new Array<CatalogoModel>();
  public Estados: CatalogoModel[] = new Array<CatalogoModel>();
  public Responsables: CatalogoModel[] = new Array<CatalogoModel>();

  public parametros: ParametrosModel;
  public attachments: AttachmentModel[] = new Array<AttachmentModel>();
  public ArchivoRemison: AttachmentModel = new AttachmentModel();



  public frmSolicitudOit: FormGroup;
  public data: any = new Array();
  public paginacion = new PaginacionModel(1, 200);

  public paramsClientes: ParametrosModel;
  public clientes: CatalogoModel[] = new Array<CatalogoModel>();
  public clienteLinea: CatalogoModel[] = new Array<CatalogoModel>();
  public tmpClienteLinea: any = new Array();
  public idSelCliente: number = 0;
  public idSelClienteLinea: number = 0;


  public model: CatalogoModel;
  public model1: CatalogoModel;



  ngOnInit(): void {
    this.solicitudOrdenTrabajoModel = new SolicitudOrdenTrabajoModel();
    this.model = new CatalogoModel();
    this.model1 = new CatalogoModel();
    this.consultarParametros();
    this.consultarParametrosCliente();
    this.initForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accion.currentValue) {
      this.accion = changes.accion.currentValue
    }
    this.ngOnInit();
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

    this.attachments = new Array<AttachmentModel>();
    this.ArchivoRemison = new AttachmentModel();
    if (this.solicitudOrdenTrabajoModelInput) {
      this.model.Valor = this.solicitudOrdenTrabajoModelInput.Cliente.NickName
      this.model.Id = this.solicitudOrdenTrabajoModelInput.Cliente.Id
      this.model1.Valor = this.solicitudOrdenTrabajoModelInput.ClienteLinea.Nombre
      this.model1.Id = this.solicitudOrdenTrabajoModelInput.ClienteLinea.Id
      this.model1.CatalogoId = this.solicitudOrdenTrabajoModelInput.Cliente.Id

      if (this.solicitudOrdenTrabajoModelInput.RemisionId) {
        this.solicitudOrdenTrabajoSrv.consultarDocumentoAdjuntoPorId(this.solicitudOrdenTrabajoModelInput.RemisionId).subscribe(response => {
          this.ArchivoRemison = response;
        });
      }
      this.solicitudOrdenTrabajoModelInput.Anexos.forEach(Anexo => {
        this.solicitudOrdenTrabajoSrv.consultarDocumentoAdjuntoPorId(Anexo.DocumentoAdjuntoId).subscribe(response => {
          if (!this.attachments.find(c => c.Id == Anexo.DocumentoAdjuntoId)) {
            this.attachments.push(response);
            Anexo.DocumentoAdjunto = response

          }


        }, error => { this.toastr.error(error.message) }

        );
      });


    } else {
      this.solicitudOrdenTrabajoModelInput = new SolicitudOrdenTrabajoModel();
    }
    this.frmSolicitudOit = this.frmBuilder.group({
      Responsable: [this.solicitudOrdenTrabajoModelInput.Responsable],
      Id: [this.solicitudOrdenTrabajoModelInput.Id],
      Guid: [this.solicitudOrdenTrabajoModelInput.Guid],
      DocumentoAdjunto: [],
      OrigenSolicitudId: [this.solicitudOrdenTrabajoModelInput.OrigenSolicitudId, Validators.required],
      Cliente: [this.solicitudOrdenTrabajoModelInput.Cliente.NickName, Validators.required],
      ClienteLinea: [this.solicitudOrdenTrabajoModelInput.ClienteLinea.Nombre],
      Contacto: [this.solicitudOrdenTrabajoModelInput.Contacto, Validators.required],
      PrioridadId: [this.solicitudOrdenTrabajoModelInput.PrioridadId, Validators.required],
      Cotizacion: [this.solicitudOrdenTrabajoModelInput.Cotizacion, Validators.required],
      Cantidad: [this.solicitudOrdenTrabajoModelInput.Cantidad, Validators.required],
      DetallesSolicitud: [this.solicitudOrdenTrabajoModelInput.DetallesSolicitud, Validators.required],
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
    console.log(evento, this.origen)
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
      if (response) {
        this.toastr.info('creacion', 'la creacion de la solicitud ha sido correcta');
        this.accionEvento.emit(response);
      }
    });
  }

  ActualizarSolcitudDeTrabajo(datosFormulario) {
    Object.assign(this.solicitudOrdenTrabajoModel, datosFormulario);
    this.solicitudOrdenTrabajoModel.ClienteId = this.solicitudOrdenTrabajoModel.Cliente.Id;
    this.solicitudOrdenTrabajoModel.LineaId = this.solicitudOrdenTrabajoModel.ClienteLinea.Id;
    delete this.solicitudOrdenTrabajoModel['Cliente']
    delete this.solicitudOrdenTrabajoModel['ClienteLinea']
    //this.solicitudOrdenTrabajoModel.Anexos = this.solicitudOrdenTrabajoModelInput.Anexos
    this.solicitudOrdenTrabajoSrv.ActualizarSolcitudDeTrabajo(this.solicitudOrdenTrabajoModel).subscribe(response => {
      if (response) {
        this.accionEvento.emit(response);
      }
    }, error => {
      this.toastr.error('error ', error.message);
    }, () => { });

  }


  procesarSolitudOit(datosFormulario) {
    this.router.navigate(['/oit/' + datosFormulario.Guid + '/procesar']);
  }

  consultarSolicitudDeTrabajoPorGuid(Guid: string) {
    this.solicitudOrdenTrabajoSrv.consultarSolicitudDeTrabajoPorGuid(Guid).subscribe(response => this.solicitudOrdenTrabajoModel = response);
  }



  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {

    let valor = this.frmSolicitudOit.controls['Cliente'].value
    let lineas: CatalogoModel[] = this.clienteLinea.filter(v => { return v.CatalogoId == valor.Id });
    if (valor && lineas.length > 0) {
      if (this.model1) {
        if (!this.model1.Id) {
          this.frmSolicitudOit.controls['ClienteLinea'].setValue(null);
          this.frmSolicitudOit.controls['ClienteLinea'].setErrors({ 'incorrect': true });

        }
      }
      this.frmSolicitudOit.controls['ClienteLinea'].setValidators(Validators.required);
    } else {
      this.frmSolicitudOit.controls['ClienteLinea'].setErrors(null);

      this.frmSolicitudOit.controls['ClienteLinea'].setValidators(null);

    }
    this.frmSolicitudOit.updateValueAndValidity();
    



    if (!this.frmSolicitudOit.valid) {
      for (var control in this.frmSolicitudOit.controls) {
        console.log(control);
        this.frmSolicitudOit.get(control.toString()).markAsDirty()
        this.frmSolicitudOit.get(control.toString()).markAsTouched()
      }
      this.toastr.error('faltan datos por diligenciar')
      return;
    }
    this.abrirModal = true
    this.confirmar.llenarObjectoData(titulo, Mensaje, Cancelar, objData);


  }

  salir(preguntar?: boolean) {
    //realizar la confirmacion
    this.router.navigate(['/solicitudOrdenTrabajo']);
  }
  enviarFormularioConfir(event) {
    if (event.response) {
      $(function () {
        $('#confirmarModal').modal('toggle');
      });
      if (this.frmSolicitudOit.valid) {
        this.enviarFormulario(event.frmSolicitudOit);

      }

    }
  }

}




