import { EntityModel, CatalogoModel, ProcesoModel } from "./Index";


export class DetalleSoldaduraModel extends EntityModel {

  private Amperaje: number;
  private CantidadSoldadura: number;
  private Lote: number;
  private PresionAcetileno: number;
  private PresionGas1: number;
  private PresionGas2: number;
  private PresionOxigeno: number;
  private TemperaturaDespuesProceso: number;
  private TemperaturaDuranteProceso: number;
  private TemperaturaPrecalentamiento: number;
  private TiempoAplicacion: number;
  private TiempoPrecalentamiento: number;
  private Voltaje: number;
  private ModoAplicacionId: number
  private TamañoCortadoresId: number
  private TipoFuenteId: number
  private TipoSoldaduraId: number
  private ProcesoId: number
  private ModoAplicacion: CatalogoModel;
  private TamañoCortadores: CatalogoModel;
  private TipoFuente: CatalogoModel;
  private TipoSoldadura: CatalogoModel;
  private Proceso: ProcesoModel;
                                              
  constructor() {
    super();
  }
}
