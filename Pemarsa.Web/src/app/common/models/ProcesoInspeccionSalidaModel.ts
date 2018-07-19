import { EntityModel, ProcesoModel, InspeccionModel } from "./Index";

export class ProcesoInspeccionSalidaModel extends EntityModel {


  private InspeccionId: number;
  private Inspeccion: InspeccionModel;


  private ProcesoId: number;
  private Proceso: ProcesoModel;

  constructor() {
    super();
    this.Inspeccion = new InspeccionModel;
  }
}
