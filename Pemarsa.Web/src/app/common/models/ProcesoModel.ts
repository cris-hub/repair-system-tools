import { EntityModel, CatalogoModel, OrdenTrabajoModel, DetalleSoldaduraModel } from "./Index";
import { ProcesoInspeccionEntradaModel } from "./ProcesoInspeccionEntradaModel";
import { ProcesoInspeccionSalidaModel } from "./ProcesoInspeccionSalidaModel";

export class ProcesoModel extends EntityModel {

  public GuidOperario: string;
  public CantidadInspeccion: number;
  public EsPruebaConGauge: boolean;
  public NombreOperario: string;
  public TrabajoRealizadoId: number
  public TrabajoRealizar: string;
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

  public ProcesosRealizarId: number
  public ProcesosRealizar: ProcesoModel;

  public ProcesoSiguienteId: number
  public ProcesoSiguiente: ProcesoModel;

  public ProcesoAnteriorId: number
  public ProcesoAnterior: ProcesoModel;

  public OrdenTrabajoId: number
  public OrdenTrabajo: OrdenTrabajoModel;

  public DetalleSoldaduraId: number
  public DetalleSoldadura: DetalleSoldaduraModel;

  public ProcesoInspeccionSalida: ProcesoInspeccionSalidaModel[];
  
  public InspeccionEntrada: ProcesoInspeccionEntradaModel[];



  constructor() {
    super();
    this.OrdenTrabajo = new OrdenTrabajoModel();
    this.TipoProceso = new CatalogoModel();

  }
}
