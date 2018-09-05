import { CatalogoModel } from "./CatalogoModel";
import { InspeccionConexionFormatoModel } from "./InspeccionConexionFormatoModel";
import { InspeccionModel } from "./InspeccionModel";
import { FormatoModel } from "./FormatoModel";
import { EntityModel } from "./EntityModel";

export class InspeccionConexionModel extends EntityModel {


  public NumeroConexion: number

  public Observaciones: string

  public ConexionId
  public Conexion: CatalogoModel


  public EstadoId
  public Estado: CatalogoModel

  public FormatoId
  public Formato: FormatoModel


  public TipoConexionId
  public TipoConexion: CatalogoModel


  public InspeccionConexionFormatoId: number
  public InspeccionConexionFormato: InspeccionConexionFormatoModel


  public InspeccionId: number
  public Inspeccion: InspeccionModel

  

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

