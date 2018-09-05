import { FormatoParametroModel, InspeccionConexionFormatoModel } from "./Index";

export class InspeccionConexionFormatoParametrosModel {

  public Id?: number
  public EstaConforme?: boolean

  public FormatoParametroId?: number
  public FormatoParametro?: FormatoParametroModel

  public InspeccionConexionFormatoId?: number
  public InspeccionConexionFormato?: InspeccionConexionFormatoModel


  constructor() {
    this.Id = 0
  }
}
