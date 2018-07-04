/// <reference path="../../orden-trabajo/listar-oit/listar-oit.component.ts" />
import { EntityModel, CatalogoModel, HerramientaMaterialModel, HerramientaTamanoModel, HerramientaModel, ClienteLineaModel, ClienteModel, AttachmentModel, SolicitudOrdenTrabajoModel } from "./Index";

export class OrdenTrabajoModel extends EntityModel {
  public Cantidad: number;
  public CantidadInspeccionar: number;
  public Cotizacion: number;
  public DetallesSolicitud: string;
  public ObservacionRemision;
  public OrdenCompra: number;
  public ProvieneDeSolicitud: number;
  public RemisionCliente: number;
  public SerialHerramienta: string;
  public SerialMaterial: string;
  public EstadoId: number;
  public Estado: CatalogoModel;
  public TipoServicioId: number;
  public TipoServicio: CatalogoModel;
  public ResponsableId: number;
  public Responsable: CatalogoModel;
  public PrioridadId: number;
  public Prioridad: CatalogoModel;
  public MaterialId: number;
  public Material: HerramientaMaterialModel;
  public TamanoHerramientaId: number;
  public TamanoHerramienta: HerramientaTamanoModel;
  public HerramientaId: number;
  public Herramienta: HerramientaModel;
  public LineaId: number;
  public Linea: ClienteLineaModel;
  public ClienteId: number;
  public Cliente: ClienteModel;
  public RemisionInicialId: number;
  public RemisionInicial: AttachmentModel;
  public SolicitudOrdenTrabajoId: number;
  public SolicitudOrdenTrabajo: SolicitudOrdenTrabajoModel;

  //Añadir propiedades de coleciones

  constructor() {
    super();
    this.Estado = new CatalogoModel();
    this.Responsable = new CatalogoModel();
    this.Prioridad = new CatalogoModel();
    this.Cliente = new ClienteModel();
    this.Herramienta = new HerramientaModel();

  }
}
