import { InspeccionModel, CatalogoModel, InspeccionConexionFormatoModel, EntityModel, FormatoModel } from "./Index";

export class InspeccionConexionModel extends EntityModel{


  public NumeroConexion: number

  public Observaciones:string

  public ConexionId
  public Conexion: CatalogoModel


  public EstadoId
  public Estado: CatalogoModel


  public TipoConexionId
  public TipoConexion: CatalogoModel


  public InspeccionConexionFormatoId: number
  public InspeccionConexionFormato :InspeccionConexionFormatoModel


  public InspeccionId: number
  public Inspeccion: InspeccionModel

  public Formato : FormatoModel

  constructor() {
    super();
    this.NumeroConexion = 0
    this.ConexionId = ''
    this.EstadoId = ''
    this.TipoConexionId = ''
    this.Observaciones = ''
    this.Id = 0

    
  };
}

