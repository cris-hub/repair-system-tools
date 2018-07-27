import { InspeccionModel, CatalogoModel, InspeccionConexionFormatoModel, EntityModel } from "./Index";

export class InspeccionConexionModel extends EntityModel{


  public NumeroConexion: number

  public Observaciones:string

  public ConexionId: number
  public Conexion: CatalogoModel


  public EstadoId: number
  public Estado: CatalogoModel


  public TipoConexionId
  public TipoConexion: CatalogoModel


  public FormatoId: number
  public InspeccionConexionFormato :InspeccionConexionFormatoModel


  public InspeccionId: number
  public Inspeccion: InspeccionModel


  constructor() {
    super();
    this.NumeroConexion = 0
    this.ConexionId = 0
    this.EstadoId = 0
    this.TipoConexionId = 0
    this.Observaciones = ''
    this.Id = 0

    
  };
}

