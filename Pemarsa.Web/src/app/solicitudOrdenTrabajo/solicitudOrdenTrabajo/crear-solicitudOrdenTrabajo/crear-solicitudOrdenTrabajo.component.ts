import { Component, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { SolicitudOrdenTrabajoModel, CatalogoModel, ParametrosModel, ClienteModel, PaginacionModel, ClienteLineaModel, AttachmentModel } from "../../../common/models/Index";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { ClienteService } from "../../../common/services/entity";
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs/operators';

@Component({
  selector: 'app-crear-solicitudOrdenTrabajo',
  templateUrl: './crear-solicitudOrdenTrabajo.component.html'
})
export class CrearSolicitudOrdenTrabajoComponent {

  public states: any = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  @ViewChild('inputFile') inputFile: ElementRef;
  private frmSolicitudOit: FormGroup;
  private SolicitudOit: SolicitudOrdenTrabajoModel;

  public Origenes: CatalogoModel[] = new Array<CatalogoModel>();
  public Prioridades: CatalogoModel[] = new Array<CatalogoModel>();
  public Estados: CatalogoModel[] = new Array<CatalogoModel>();
  private parametros: ParametrosModel;

  private paginacion = new PaginacionModel(1, 200);

  private paramsClientes: ParametrosModel;
  private clientes: CatalogoModel[] = new Array<CatalogoModel>();
  private clienteLinea: CatalogoModel[] = new Array<CatalogoModel>();

  private attachments: AttachmentModel[] = new Array<AttachmentModel>();

  model: any;
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private frmBuilder: FormBuilder,
    public parametroSrv: ParametroService,
    private clienteSrv: ClienteService,) {
    this.SolicitudOit = new SolicitudOrdenTrabajoModel();
    this.consultarParametros();
    this.consultarParametrosCliente();
    this.initForm();
  }

  initForm() {
    this.frmSolicitudOit = this.frmBuilder.group({
      Id: [this.SolicitudOit.Id],
      OrigenSolicitudId: [this.SolicitudOit.OrigenSolicitudId],
      ClienteId: [this.SolicitudOit.ClienteId],
      LineaId: [this.SolicitudOit.LineaId],
      Contacto: [this.SolicitudOit.Contacto],
      PrioridadId: [this.SolicitudOit.PrioridadId],
      Cotizacion: [this.SolicitudOit.Cotizacion],
      Cantidad: [this.SolicitudOit.Cantidad],
      DetallesSolicitud: [this.SolicitudOit.DetallesSolicitud],
      NombreUsuarioCrea: ['Admin'],//este campo debe ser actualizado con la api de seguridad
      GuidUsuarioCrea: ['00000000-0000-0000-0000-000000000000'],//este campo debe ser actualizado con la api de seguridad
      GuidOrganizacion: ['00000000-0000-0000-0000-000000000000']//este campo debe ser actualizado con la api de seguridad
    });
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
      });
  }

  clienteLineaEvent(event: any) {
    let idSeleccionado: any = event.target.value;
    if (idSeleccionado != "null") {
      this.clienteLinea = this.paramsClientes.Consultas.filter(e => e.CatalogoId == idSeleccionado && e.Grupo == "clientelinea");
    }
    else {
      this.clienteLinea = new Array<CatalogoModel>();
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
          attachment.Stream = reader.result.split(',')[1];

          //estos campo debe ser actualizado con la api de seguridad
          attachment.NombreUsuarioCrea = 'Admin';
          attachment.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
          attachment.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';
          this.attachments.push(attachment);
          console.log(this.inputFile);
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
      distinctUntilChanged(),
      merge(this.focus$),
      merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
      map(term => (term === '' ? this.states
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

}
