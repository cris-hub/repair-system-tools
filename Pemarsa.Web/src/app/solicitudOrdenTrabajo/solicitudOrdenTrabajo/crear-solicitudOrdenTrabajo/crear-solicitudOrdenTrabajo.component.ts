import { Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { SolicitudOrdenTrabajoModel, CatalogoModel, ParametrosModel, ClienteModel, PaginacionModel, ClienteLineaModel, AttachmentModel } from "../../../common/models/Index";
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



  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accion.currentValue) {
      this.accion = changes.accion.currentValue
    }
    
    console.log(changes,this.accion)
    
    this.solicitudOrdenTrabajoModel = new SolicitudOrdenTrabajoModel();
    this.model = new CatalogoModel();
    this.model1 = new CatalogoModel();
    this.consultarParametros();
    this.consultarParametrosCliente();
    this.initForm();
  }

  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('instance') instance: NgbTypeahead;
  @Input() public accion: string[];
  @Input() public solicitudOrdenTrabajoModelInput: SolicitudOrdenTrabajoModel;



  private esActualizar: boolean = false;
  private esVer: boolean =false;
  private esValido: boolean = false;

  private frmSolicitudOit: FormGroup;
  private solicitudOrdenTrabajoModel: SolicitudOrdenTrabajoModel;

  public Origenes: CatalogoModel[] = new Array<CatalogoModel>();
  public Prioridades: CatalogoModel[] = new Array<CatalogoModel>();
  public Estados: CatalogoModel[] = new Array<CatalogoModel>();
  private parametros: ParametrosModel;
  public data: any = new Array();
  private paginacion = new PaginacionModel(1, 200);

  private paramsClientes: ParametrosModel;
  private clientes: CatalogoModel[] = new Array<CatalogoModel>();
  private clienteLinea: CatalogoModel[] = new Array<CatalogoModel>();
  private tmpClienteLinea: any = new Array();
  private idSelCliente: number = 0;
  private idSelClienteLinea: number = 0;

  private attachments: AttachmentModel[] = new Array<AttachmentModel>();

  public model: CatalogoModel;
  public model1: CatalogoModel;

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
      

      this.frmSolicitudOit = this.frmBuilder.group({
        Id: [this.solicitudOrdenTrabajoModelInput.Id],
        
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



    } else {
      this.frmSolicitudOit = this.frmBuilder.group({
        DocumentoAdjunto: [],
        OrigenSolicitudId: [this.solicitudOrdenTrabajoModel.OrigenSolicitudId],
        Cliente: [this.solicitudOrdenTrabajoModel.ClienteId],
        ClienteLinea: [this.solicitudOrdenTrabajoModel.LineaId],
        Contacto: [this.solicitudOrdenTrabajoModel.Contacto],
        PrioridadId: [this.solicitudOrdenTrabajoModel.PrioridadId],
        Cotizacion: [this.solicitudOrdenTrabajoModel.Cotizacion],
        Cantidad: [this.solicitudOrdenTrabajoModel.Cantidad],
        DetallesSolicitud: [this.solicitudOrdenTrabajoModel.DetallesSolicitud],
        NombreUsuarioCrea: ['Admin'],//este campo debe ser actualizado con la api de seguridad
        GuidUsuarioCrea: ['00000000-0000-0000-0000-000000000000'],//este campo debe ser actualizado con la api de seguridad
        GuidOrganizacion: ['00000000-0000-0000-0000-000000000000']//este campo debe ser actualizado con la api de seguridad
      });

    }
    console.log(this.accion)
    if (this.accion[0] == 'Ver') {
      this.desabilidarCamposFormulario();
      this.esVer = true;
    } else {
      this.esVer = false
      this.habilidarCamporFormulario();
    }

  }


  habilidarCamporFormulario() {
    
    this.frmSolicitudOit.get('OrigenSolicitudId').enable();;
    this.frmSolicitudOit.get('Cliente').enable();
    this.frmSolicitudOit.get('ClienteLinea').enable();
    this.frmSolicitudOit.get('Contacto').enable();
    this.frmSolicitudOit.get('PrioridadId').enable();
    this.frmSolicitudOit.get('Cotizacion').enable();
    this.frmSolicitudOit.get('Cantidad').enable();
    this.frmSolicitudOit.get('DetallesSolicitud').enable();
    this.frmSolicitudOit.get('NombreUsuarioCrea').enable();
    this.frmSolicitudOit.get('GuidUsuarioCrea').enable();
    this.frmSolicitudOit.get('GuidOrganizacion').enable();
    this.frmSolicitudOit.get('DocumentoAdjunto').enable();
  }
  desabilidarCamposFormulario() {



    this.frmSolicitudOit.get('OrigenSolicitudId').disable()
    this.frmSolicitudOit.get('Cliente').disable();
    this.frmSolicitudOit.get('ClienteLinea').disable();
    this.frmSolicitudOit.get('Contacto').disable();
    this.frmSolicitudOit.get('PrioridadId').disable();
    this.frmSolicitudOit.get('Cotizacion').disable();
    this.frmSolicitudOit.get('Cantidad').disable();
    this.frmSolicitudOit.get('DetallesSolicitud').disable();
    this.frmSolicitudOit.get('NombreUsuarioCrea').disable();
    this.frmSolicitudOit.get('GuidUsuarioCrea').disable();
    this.frmSolicitudOit.get('GuidOrganizacion').disable();
    this.frmSolicitudOit.get('DocumentoAdjunto').disable();
  }


  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("SOLICITUD")
      .subscribe(response => {
        this.parametros = response;
        this.Origenes = this.parametros.Catalogos.filter(e => e.Grupo == "ORIGEN_SOLICITUD");
        this.Estados = this.parametros.Catalogos.filter(e => e.Grupo == "ESTADOS_SOLICITUD");
        this.Prioridades = this.parametros.Catalogos.filter(e => e.Grupo == "PRIORIDAD_SOLICITUD");
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
          attachment.Stream = reader.result.split(',')[1];

          //estos campo debe ser actualizado con la api de seguridad
          attachment.NombreUsuarioCrea = 'Admin';
          attachment.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
          attachment.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';
          this.attachments.push(attachment);

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
      this.actualizarEstadoSolicitudDeTrabajo(datosFormulario);
    }
    if (this.accion[0] == 'Procesar') {
      this.actualizarEstadoSolicitudDeTrabajo(datosFormulario);
    }
  }


  crearSolicitudOit(datosFormulario) {
    Object.assign(this.solicitudOrdenTrabajoModel, datosFormulario);


    this.solicitudOrdenTrabajoModel.ClienteId = this.solicitudOrdenTrabajoModel.Cliente.Id;
    this.solicitudOrdenTrabajoModel.LineaId = this.solicitudOrdenTrabajoModel.ClienteLinea.Id;
    delete this.solicitudOrdenTrabajoModel['Cliente']
    delete this.solicitudOrdenTrabajoModel['ClienteLinea']
    this.solicitudOrdenTrabajoSrv.crearSolicitudOit(this.solicitudOrdenTrabajoModel).subscribe(response => {
      this.toastr.info(JSON.stringify(response));
    });
  }
  actualizarEstadoSolicitudDeTrabajo(datosFormulario) {
    Object.assign(this.solicitudOrdenTrabajoModel, datosFormulario);
    this.solicitudOrdenTrabajoModel.ClienteId = this.solicitudOrdenTrabajoModel.Cliente.Id;
    this.solicitudOrdenTrabajoModel.LineaId = this.solicitudOrdenTrabajoModel.ClienteLinea.Id;
    delete this.solicitudOrdenTrabajoModel['Cliente']
    delete this.solicitudOrdenTrabajoModel['ClienteLinea']
    this.solicitudOrdenTrabajoSrv.actualizarEstadoSolicitudDeTrabajo(this.solicitudOrdenTrabajoModel).subscribe(response => {
      this.toastr.info(JSON.stringify(response));
    });
  }

  consultarSolicitudDeTrabajoPorGuid(Guid: string) {
    this.solicitudOrdenTrabajoSrv.consultarSolicitudDeTrabajoPorGuid(Guid).subscribe(response => this.solicitudOrdenTrabajoModel = response);
  }

}
