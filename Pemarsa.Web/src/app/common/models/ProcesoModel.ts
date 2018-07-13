import { EntityModel, CatalogoModel, OrdenTrabajoModel, DetalleSoldaduraModel } from "./Index";

export class ProcesoModel extends EntityModel {

  private GuidOperario: string;
  private CantidadInspeccion: number;
  private EsPruebaConGauge: boolean;
  private NombreOperario: string;
  private TrabajoRealizadoId: number
  private TrabajoRealizar: any;
  private EstadoId: number
  private TipoProcesoAnteriorId: number
  private TipoProcesoId: number
  private TipoProcesoSiguienteId: number
  private TipoProcesoSiguienteSugeridoId: number
  private TipoSoldaduraId: number
  private EquipoMedicionUtilizadoId: number
  private NormaId: number
  private MaquinaAsignadaId: number
  private InstructivoId: number
  private ProcesosRealizarId: number
  private ProcesoSiguienteId: number
  private ProcesoAnteriorId: number
  private OrdenTrabajoId: number
  private DetalleSoldaduraId: number
  private Estado: CatalogoModel;
  private TipoProcesoAnterior: CatalogoModel;
  private TipoProceso: CatalogoModel;
  private TipoProcesoSiguiente: CatalogoModel;
  private TipoProcesoSiguienteSugerido: CatalogoModel;
  private TipoSoldadura: CatalogoModel;
  private EquipoMedicionUtilizado: CatalogoModel;
  private Norma: CatalogoModel;
  private MaquinaAsignada: CatalogoModel;
  private Instructivo: CatalogoModel;
  private ProcesosRealizar: ProcesoModel;
  private ProcesoSiguiente: ProcesoModel;
  private ProcesoAnterior: ProcesoModel;
  private OrdenTrabajo: OrdenTrabajoModel;
  private DetalleSoldadura: DetalleSoldaduraModel;

  constructor() {
    super();

    this.ProcesoAnterior = new ProcesoModel();
    this.TipoProceso = new CatalogoModel();

  }
}
