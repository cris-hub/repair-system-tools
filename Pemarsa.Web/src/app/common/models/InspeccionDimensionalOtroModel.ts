import { EntityModel } from "./EntityModel";
import { InspeccionModel } from "./InspeccionModel";


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
