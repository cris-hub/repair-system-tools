import { InspeccionModel, CatalogoModel, InspeccionConexionFormatoModel, EntityModel, FormatoModel } from "./Index";

export class InspeccionConexionModel extends EntityModel {


  public NumeroConexion: number

  public Observaciones: string

  public ConexionId
  public Conexion: CatalogoModel


  public EstadoId
  public Estado: CatalogoModel


  public TipoConexionId
  public TipoConexion: CatalogoModel


  public InspeccionConexionFormatoId: number
  public InspeccionConexionFormato: InspeccionConexionFormatoModel


  public InspeccionId: number
  public Inspeccion: InspeccionModel

  public Formato: FormatoModel

  constructor() {
    super();
    this.NumeroConexion = 0
    this.ConexionId = 0
    this.EstadoId = 0
    this.TipoConexionId = 0
    this.Observaciones = null
    this.Id = 0


  };
}

