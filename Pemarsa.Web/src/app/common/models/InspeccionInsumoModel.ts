import { EntityModel, InspeccionModel, CatalogoModel } from "./Index";

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

