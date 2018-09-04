import { EntityModel } from "./EntityModel";
import { ClienteLineaModel } from "./ClienteLineaModel";
import { ClienteModel } from "./ClienteModel";
import { CatalogoModel } from "./CatalogoModel";
import { AttachmentModel } from "./AttachmentModel";
import { SolicitudOrdenTrabajoAnexosModel } from "./SolicitudOrdenTrabajoAnexosModel";


export class SolicitudOrdenTrabajoModel extends EntityModel {

  public Cantidad: number;

  public CantidadInspeccionar: number;

  public Contacto: string;

  public Cotizacion: number;

  public DetallesSolicitud: string;

  public ClienteId: number;
  public Cliente: ClienteModel;

  public EstadoId: number;
  public Estado: CatalogoModel;

  public LineaId: number;
  public ClienteLinea: ClienteLineaModel;

  public OrigenSolicitudId: number;
  public OrigenSolicitud: CatalogoModel;

  public PrioridadId: number;
  public Prioridad: CatalogoModel;

  public ResponsableId: number;
  public Responsable: CatalogoModel;

  public RemisionId: number;
  public Remision: AttachmentModel;


  public Anexos: SolicitudOrdenTrabajoAnexosModel[];

  public ResponsableValor: string;
  public ClienteNickName: string;
  public ClienteLineaNombre: string;
  public PrioridadValor: string;
  public EstadoValor: string;

  constructor() {
    super();
    this.Cliente = new ClienteModel();
    this.ClienteLinea = new ClienteLineaModel();
    this.Anexos = new Array<SolicitudOrdenTrabajoAnexosModel>();
  }
}
