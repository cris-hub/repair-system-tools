import { CatalogoModel } from "./CatalogoModel";
import { InspeccionModel } from "./InspeccionModel";
import { EntityModel } from "./EntityModel";

export class InspeccionInsumoModel extends EntityModel {

  public NumeroLote: number

  public TipoInsumoId: number
  public TipoInsumo: CatalogoModel


  public InspeccionId: number
  public Inspeccion: InspeccionModel

  constructor() {
    super();
    
    
  }
}

