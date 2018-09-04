import { CatalogoModel } from "./CatalogoModel";
import { InspeccionConexionFormatoModel } from "./InspeccionConexionFormatoModel";

export class ConexionEquipoMedicionUsadoModel {


  public InspeccionConexionFormatoId?: number
  public InspeccionConexionFormato?: InspeccionConexionFormatoModel


  public EquipoMedicionId?: number
  public EquipoMedicion?: CatalogoModel
  constructor(any? : any) {

  }

}


