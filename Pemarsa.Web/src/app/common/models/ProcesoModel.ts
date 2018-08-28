import { EntityModel, CatalogoModel, OrdenTrabajoModel, DetalleSoldaduraModel } from "./Index";
import { ProcesoInspeccionEntradaModel } from "./ProcesoInspeccionEntradaModel";
import { ProcesoInspeccionSalidaModel } from "./ProcesoInspeccionSalidaModel";
import { ProcesoRealizarModel } from "src/app/common/models/ProcesoRealizarModel";

export class ProcesoModel extends EntityModel {

  public GuidOperario: string;
  public NombreOperario: string;

  public GuidPersonaAsignaOperario: string;
  public NombrePersonaAsignaOperario: string;

  public GuidPersonaCompleta: string;
  public NombrePersonaCompleta: string;

  public GuidPersonaLibera: string;
  public NombrePersonaLibera: string;

  public CantidadInspeccion: number;

  public EsPruebaConGauge: boolean;
  public Reasignado : boolean

  public TrabajoRealizar: string;

  public TrabajoRealizado: string

  public ObservacionRechazo: string

  public Pieza: number;

  public EstadoId: number;
  public Estado: CatalogoModel;

  public TipoProcesoAnteriorId: number
  public TipoProcesoAnterior: CatalogoModel;

  public TipoProcesoId: number
  public TipoProceso: CatalogoModel;

  public TipoProcesoSiguienteId: number
  public TipoProcesoSiguiente: CatalogoModel;

  public TipoProcesoSiguienteSugeridoId: number
  public TipoProcesoSiguienteSugerido: CatalogoModel;

  public TipoSoldaduraId: number
  public TipoSoldadura: CatalogoModel;

  public EquipoMedicionUtilizadoId: number
  public EquipoMedicionUtilizado: CatalogoModel;

  public NormaId: number
  public Norma: CatalogoModel;

  public MaquinaAsignadaId: number
  public MaquinaAsignada: CatalogoModel;

  public InstructivoId: number
  public Instructivo: CatalogoModel;

  //public ProcesosRealizarId: number
  public ProcesoRealizar: ProcesoRealizarModel[];

  public ProcesoSiguienteId: number
  public ProcesoSiguiente: ProcesoModel;

  public ProcesoAnteriorId: number
  public ProcesoAnterior: ProcesoModel;

  public OrdenTrabajoId: number;
  public OrdenTrabajoHerramientaNombre: string;
  public OrdenTrabajoClienteNickName: string;
  public OrdenTrabajoSerialHerramienta: string;
  public OrdenTrabajoPrioridadValor: string;
  public OrdenTrabajo: OrdenTrabajoModel;

  public DetalleSoldaduraId: number
  public DetalleSoldadura: DetalleSoldaduraModel;

  public ProcesoInspeccionSalida: ProcesoInspeccionSalidaModel[];
  
  public InspeccionEntrada: ProcesoInspeccionEntradaModel[];

  public EstadoValor: string;
  public TipoProcesoAnteriorValor: string;

  constructor() {
    super();
    this.OrdenTrabajo = new OrdenTrabajoModel();
    this.TipoProceso = new CatalogoModel();
    this.TipoProcesoAnterior = new CatalogoModel();

  }
}
