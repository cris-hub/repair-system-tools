import { EntityModel, AttachmentModel, ClienteModel, CatalogoModel, ClienteLineaModel, SolicitudOrdenTrabajoAnexosModel } from "./Index";

export class SolicitudOrdenTrabajoModel extends EntityModel {
  public Anexos: SolicitudOrdenTrabajoAnexosModel[];
  public Cantidad: number;
  public CantidadInspeccionar: number;
  public ClienteId: number;
  public Contacto: string;
  public Cotizacion: number;
  public DetallesSolicitud: string;
  public EstadoId: number;
  public LineaId: number;
  public OrigenSolicitudId: number;
  public PrioridadId: number;
  public ResponsableId: number;
  public DocumentoAdjunto: AttachmentModel[];
  public Cliente: ClienteModel;
  public Estado: CatalogoModel;
  public ClienteLinea: ClienteLineaModel;
  public OrigenSolicitud: CatalogoModel;
  public Prioridad: CatalogoModel;
  public Responsable: CatalogoModel;

  constructor() {
    super();
    this.DocumentoAdjunto = new Array<AttachmentModel>();
    this.Cliente = new ClienteModel();
    this.Estado = new CatalogoModel();
    this.ClienteLinea = new ClienteLineaModel();
    this.OrigenSolicitud = new CatalogoModel();
    this.Prioridad = new CatalogoModel();
    this.Responsable = new CatalogoModel();
  }
}
