import { CatalogoModel } from "src/app/common/models/Index";
import { ProcesoModel } from "src/app/common/models/ProcesoModel";

export class ProcesoRealizarModel {

  public Valor: string;

  public TipoProcesoId: number
  public TipoProceso: CatalogoModel;

  public ProcesoId: number;
  public Proceso: ProcesoModel;
}
