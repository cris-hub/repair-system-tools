import { EntityModel, ProcesoModel, InspeccionModel } from "./Index";

export class ProcesoInspeccion extends EntityModel {


  public InspeccionId: number;
  public Inspeccion: InspeccionModel;


  public ProcesoId: number;
  public Proceso: ProcesoModel;

  constructor() {
    super();
    this.Inspeccion = new InspeccionModel;
  }
}
