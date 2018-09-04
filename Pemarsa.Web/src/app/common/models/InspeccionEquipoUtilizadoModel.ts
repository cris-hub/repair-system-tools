import { CatalogoModel } from "./CatalogoModel";
import { InspeccionModel } from "./InspeccionModel";

export class InspeccionEquipoUtilizadoModel {


  public EquipoUtilizadoId: number
  public EquipoUtilizado: CatalogoModel


  public InspeccionId: number
  public Inspeccion: InspeccionModel
  constructor(InspeccionId,EquipoUtilizadoId) {
    this.EquipoUtilizado = new CatalogoModel();
  }

}
