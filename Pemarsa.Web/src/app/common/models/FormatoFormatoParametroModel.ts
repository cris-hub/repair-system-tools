import { CatalogoModel } from "./CatalogoModel";
import { FormatoModel } from "./FormatoModel";
import { FormatoParametroModel } from "./FormatoParametroModel";

export class FormatoFormatoParametroModel {

  public FormatoId : number
  public Formato: FormatoModel

  public TipoFormatoParametroId: number
  public TipoFormatoParametro: CatalogoModel

  public FormatoParametroId: number
  public FormatoParametro : FormatoParametroModel

  constructor() { }
}
