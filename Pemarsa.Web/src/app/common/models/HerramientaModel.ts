import { EntityModel } from "./EntityModel";
import { CatalogoModel } from "./CatalogoModel";
import { ClienteLineaModel } from "./ClienteLineaModel";
import { HerramientaTamanoModel } from "./HerramientaTamanoModel";
import { HerramientaTamanoMotorModel } from "./HerramientaTamanoMotorModel";
import { HerramientaEstudioFactibilidadModel } from "./HerramientaEstudioFactibilidadModel";
import { HerramientaMaterialModel } from "./HerramientaMaterialModel";
import { ClienteModel } from "./ClienteModel";

export class HerramientaModel extends EntityModel {
  public ClienteId: number;
  public EsHerramientaMotor: boolean; 
  public EsHerramientaPetrolera: boolean; 
  public EsHerramientaPorCantidad: boolean;
  public EstadoId: number;
  public EstudioFactibilidadId: number;
  public GuidUsuarioVerifica: string; 
  public NombreUsuarioVerifica: string;
  public LineaId: number
  public Materiales: HerramientaMaterialModel[];
  public Moc: number;
  public Nombre: string; 
  public TamanosHerramienta: HerramientaTamanoModel[]; 
  public TamanosMotor: HerramientaTamanoMotorModel[];
  public Cliente: ClienteModel;
  public Estado: CatalogoModel;
  public HerramientaEstudioFactibilidad: HerramientaEstudioFactibilidadModel;
  public Linea: ClienteLineaModel;

  constructor() {
    super();
    this.TamanosHerramienta = new Array<HerramientaTamanoModel>();
    this.TamanosMotor = new Array<HerramientaTamanoMotorModel>()
    this.Cliente = new ClienteModel();
    this.Estado = new CatalogoModel();
    this.HerramientaEstudioFactibilidad = new HerramientaEstudioFactibilidadModel();
    this.Linea = new ClienteLineaModel();
    this.Materiales = new Array<HerramientaMaterialModel>();
    
  }
}
