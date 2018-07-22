import { EntityModel, InspeccionModel } from "./Index";

export class InspeccionDimensionalOtroModel extends EntityModel {


  public Conformidad : boolean

  public MedidaActual:string

  public MedidaNominal: string

  public Tolerancia :string


  public InspeccionId: number
  public Inspeccion: InspeccionModel
  constructor() {
    super();
  }


}
