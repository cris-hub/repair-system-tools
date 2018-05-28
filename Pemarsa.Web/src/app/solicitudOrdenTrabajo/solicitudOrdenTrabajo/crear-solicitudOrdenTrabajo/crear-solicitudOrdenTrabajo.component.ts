import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { SolicitudOrdenTrabajoModel, CatalogoModel, ParametrosModel, ClienteModel, PaginacionModel, ClienteLineaModel, AttachmentModel } from "../../../common/models/Index";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { ClienteService } from "../../../common/services/entity";
import { AutocompletarComponent } from "../../../common/directivas/autocompletar/autocompletar.component";

@Component({
  selector: 'app-crear-solicitudOrdenTrabajo',
  templateUrl: './crear-solicitudOrdenTrabajo.component.html'
})
export class CrearSolicitudOrdenTrabajoComponent implements OnInit {

  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild(AutocompletarComponent) autoCompletar: AutocompletarComponent;

  private frmSolicitudOit: FormGroup;
  private SolicitudOit: SolicitudOrdenTrabajoModel;

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
  private tmpCliente: any = new Array();
  private idSelCliente: number = 0;
  private idSelClienteLinea: number = 0;

  private attachments: AttachmentModel[] = new Array<AttachmentModel>();

  constructor(
    private frmBuilder: FormBuilder,
    public parametroSrv: ParametroService) {
    
  }

  ngOnInit(){
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
        this.clienteLinea = this.paramsClientes.Consultas.filter(e => e.Grupo == "clientelinea");
        this.cargarClientesArray();
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

  cargarClientesArray() {
    this.data = [
      {
        opcion: 'clientes',
        valor: this.clientes,
        filtro: ['guid','valor']
      },
      {
        opcion: 'linea',
        valor: this.clienteLinea,
        filtro: ['guid', 'valor']
      }
    ];
  }

  filtrarData(opcion) {
    this.autoCompletar.opcion = opcion;
  }
}
