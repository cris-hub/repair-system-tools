import { FormatoModel, FormatoParametroModel, CatalogoModel } from "./Index";

export class FormatoFormatoParametroModel {

  public FormatoId : number
  public Formato: FormatoModel

  public TipoFormatoParametroId: number
  public TipoFormatoParametro: CatalogoModel

  public FormatoParametroId: number
  public FormatoParametro : FormatoParametroModel

  constructor() { }
}
