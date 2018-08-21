import { FormatoModel, CatalogoModel } from "./Index";

export class FormatoTiposConexionModel {

  public Id? :number
  public FormatoId? : number
  public Formato ?: FormatoModel
  public TipoConexionId?: number
  public TipoConexion? : CatalogoModel
  public Estado ?: boolean

  constructor() {

  }
}
