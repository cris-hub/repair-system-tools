import { EntityModel, AttachmentModel, CatalogoModel, InspeccionFotosModel, InspeccionConexionModel, InspeccionDimensionalOtroModel, InspeccionEquipoUtilizadoModel, InspeccionInsumoModel } from "./Index";

export class InspeccionModel extends EntityModel {
  public Amperaje: number;
  public ConcentracionUtilizada: number;
  public EstaConforme: boolean;
  public FechaDePreparacion: Date;
  public InspeccionLuzNegra: boolean;
  public InspeccionYoke: boolean;
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
  public TipoDeLiquidosId: number;
  public TipoInspeccionId: number;
  public TuboPatronId: number;
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
  
  public TipoDeLiquidos: CatalogoModel;
  public TipoInspeccion: CatalogoModel;
  public TuboPatron: CatalogoModel;
  public ImagenMedicionEspesores: AttachmentModel;
  public ImagenMfl: AttachmentModel;
  public ImagenPantallaUltrasonido: AttachmentModel;
  public ImagenUltrasonidoDespues: AttachmentModel;
  public ImagenUltrasonidoDurante: AttachmentModel;
  public ImagenUltrasonidoPrevia: AttachmentModel;
  public InspeccionFotos: InspeccionFotosModel[];
  public Conexiones: InspeccionConexionModel[];
  public Dimensionales: InspeccionDimensionalOtroModel[]
  public Insumos: InspeccionInsumoModel[]

  
  public InspeccionEquipoUtilizado: InspeccionEquipoUtilizadoModel[];

  constructor() {
    super();
    this.InspeccionFotos = new Array<InspeccionFotosModel>();
    this.Conexiones = new Array<InspeccionConexionModel>();
    this.Insumos = new Array<InspeccionInsumoModel>();
    this.ImagenMfl = new AttachmentModel()
    this.ImagenMedicionEspesores = new AttachmentModel()
    this.Dimensionales = new Array<InspeccionDimensionalOtroModel>();
    this.InspeccionEquipoUtilizado = new Array<InspeccionEquipoUtilizadoModel>();
  }
}
