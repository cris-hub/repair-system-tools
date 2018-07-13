import { EntityModel, ProcesoModel, InspeccionModel } from "./Index";

export class ProcesoInspeccionEntradaModel extends EntityModel {


  private InspeccionId: number;
  private Inspeccion: InspeccionModel;


  private ProcesoId: number;
  private Proceso: ProcesoModel;

  constructor() { super(); }
}
