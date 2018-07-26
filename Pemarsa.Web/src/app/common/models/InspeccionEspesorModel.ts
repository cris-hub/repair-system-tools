import { EntityModel, InspeccionModel } from "./Index";

export class InspeccionEspesorModel extends EntityModel {

  public Desviacion: number
  
  public EspesorActual: number

  public EspesorNominal: number
  
  public InspeccionId: number
  public Inspeccion: InspeccionModel

  constructor() {
    super();
  }
}
