import { CatalogoModel } from "src/app/common/models/Index";
import { ProcesoModel } from "src/app/common/models/ProcesoModel";

export class ProcesoEquipoMedicionModel {

  public ValorEquipoMedicion: string;

  public IdEquipoMedicion: number
  public EquipoMedicion: CatalogoModel;

  public ProcesoId: number;
  public Proceso: ProcesoModel;
}
