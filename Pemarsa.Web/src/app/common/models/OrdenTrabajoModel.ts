import { EntityModel } from "./EntityModel";
import { AttachmentModel } from "./AttachmentModel";
import { OrdenTrabajoAnexosModel } from "./OrdenTrabajoAnexosModel";
import { SolicitudOrdenTrabajoModel } from "./SolicitudOrdenTrabajoModel";
import { ClienteModel } from "./ClienteModel";
import { HerramientaModel } from "./HerramientaModel";
import { ClienteLineaModel } from "./ClienteLineaModel";
import { HerramientaTamanoModel } from "./HerramientaTamanoModel";
import { HerramientaMaterialModel } from "./HerramientaMaterialModel";
import { CatalogoModel } from "./CatalogoModel";
import { RemisionModel } from "./RemisionModel";



export class OrdenTrabajoModel extends EntityModel {
  public Cantidad: number;
  public CantidadInspeccionar: number;
  public Cotizacion: number;
  public DetallesSolicitud: string;
  public ObservacionRemision;
  public OrdenCompra: number;
  public ProvieneDeSolicitud: boolean;
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
  public Anexos: OrdenTrabajoAnexosModel[];
  public ClienteNickname: string;
  public HerramientaNombre: string;
  public TipoServicioValor: string;
  public ResponsableValor: string;
  public EstadoValor: string;
  public RemisionId: number;
  public Remision: RemisionModel;

  //Añadir propiedades de coleciones

  constructor() {
    super();
    this.Cliente = new ClienteModel();
    this.Responsable = new CatalogoModel();
    this.Linea = new ClienteLineaModel();
    this.Herramienta = new HerramientaModel();
    this.TipoServicio = new CatalogoModel();
    this.TamanoHerramienta = new HerramientaTamanoModel();
    this.Material = new HerramientaMaterialModel();
    this.Anexos = new Array<OrdenTrabajoAnexosModel>();



  }
}
