import { EntityModel, AttachmentModel, CatalogoModel } from "./Index";

export class InspeccionModel extends EntityModel {
  private Amperaje: number;
  private ConcentracionUtilizada: number;
  private EstaConforme: boolean;
  private FechaDePreparacion: Date;
  private InspeccionLuzNegra: boolean;
  private InspeccionParticulasMagneticas: boolean;
  private IntensidadLuzBlanca: number;
  private IntensidadLuzNegra: number;
  private Lote: number;
  private Lumens: number;
  private Luxes: number;
  private Observaciones: string;
  private ObservacionesInspeccion: string;
  private SeIdentificaDefecto: boolean;
  private SeRealizoCalibracionEquipo: boolean;
  private TemperaturaAmbiente: number;
  private TemperaturaDePieza: number;
  private VelocidadBuggyDrive: number;
  private BloqueEscalonadoUsadoId: number;
  private BobinaMagneticaId: number;
  private EquipoEmiId: number;
  private EstadoId: number;
  private EquipoUtilizadoId: number;
  private TipoDeLiquidosId: number;
  private TipoInspeccionId: number;
  private TurboPatronId: number;
  private ImagenMedicionEspesoresId: number;
  private ImagenMflId: number;
  private ImagenPantallaUltrasonidoId: number;
  private ImagenUltrasonidoDespuesId: number;
  private ImagenUltrasonidoDuranteId: number;
  private ImagenUltrasonidoPreviaId: number;
  private BloqueEscalonadoUsado: CatalogoModel;
  private BobinaMagnetica: CatalogoModel;
  private EquipoEmi: CatalogoModel;
  private Estado: CatalogoModel;
  private EquipoUtilizado: CatalogoModel;
  private TipoDeLiquidos: CatalogoModel;
  private TipoInspeccion: CatalogoModel;
  private TurboPatron: CatalogoModel;
  private ImagenMedicionEspesores: AttachmentModel;
  private ImagenMfl: AttachmentModel;
  private ImagenPantallaUltrasonido: AttachmentModel;
  private ImagenUltrasonidoDespues: AttachmentModel;
  private ImagenUltrasonidoDurante: AttachmentModel;
  private ImagenUltrasonidoPrevia: AttachmentModel;

  constructor() {
    super();
  }
}
