import { FormatoParametroModel, InspeccionConexionFormatoModel } from "./Index";

export class InspeccionConexionFormatoParametrosModel {

  public Id: number
  public EstaConforme: boolean
  public FormatoParametro :number 

  public InspeccionConexionFormatoId: number
  public InspeccionConexionFormato: InspeccionConexionFormatoModel


  constructor() {
  }
}
