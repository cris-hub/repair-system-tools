import { EntityModel, AttachmentModel, CatalogoModel, InspeccionFotosModel } from "./Index";

export class InspeccionModel extends EntityModel {
  public Amperaje: number;
  public ConcentracionUtilizada: number;
  public EstaConforme: boolean;
  public FechaDePreparacion: Date;
  public InspeccionLuzNegra: boolean;
  public InspeccionParticulasMagneticas: boolean;
  public IntensidadLuzBlanca: number;
  public IntensidadLuzNegra: number;
  public Lote: number;
  public Lumens: number;
  public Luxes: number;
  public Observaciones: string;
  public ObservacionesInspeccion: string;
  public SeIdentificaDefecto: boolean;
  public SeRealizoCalibracionEquipo: boolean;
  public TemperaturaAmbiente: number;
  public TemperaturaDePieza: number;
  public VelocidadBuggyDrive: number;
  public BloqueEscalonadoUsadoId: number;
  public BobinaMagneticaId: number;
  public EquipoEmiId: number;
  public EstadoId: number;
  public EquipoUtilizadoId: number;
  public TipoDeLiquidosId: number;
  public TipoInspeccionId: number;
  public TurboPatronId: number;
  public Pieza: number;
  public ImagenMedicionEspesoresId: number;
  public ImagenMflId: number;
  public ImagenPantallaUltrasonidoId: number;
  public ImagenUltrasonidoDespuesId: number;
  public ImagenUltrasonidoDuranteId: number;
  public ImagenUltrasonidoPreviaId: number;
  public BloqueEscalonadoUsado: CatalogoModel;
  public BobinaMagnetica: CatalogoModel;
  public EquipoEmi: CatalogoModel;
  public Estado: CatalogoModel;
  public EquipoUtilizado: CatalogoModel;
  public TipoDeLiquidos: CatalogoModel;
  public TipoInspeccion: CatalogoModel;
  public TurboPatron: CatalogoModel;
  public ImagenMedicionEspesores: AttachmentModel;
  public ImagenMfl: AttachmentModel;
  public ImagenPantallaUltrasonido: AttachmentModel;
  public ImagenUltrasonidoDespues: AttachmentModel;
  public ImagenUltrasonidoDurante: AttachmentModel;
  public ImagenUltrasonidoPrevia: AttachmentModel;
  public InspeccionFotos: InspeccionFotosModel[];
  constructor() {
    super();
    this.InspeccionFotos = new Array<InspeccionFotosModel>();
  }
}
