import { EntityModel, CatalogoModel, ProcesoModel } from "./Index";


export class DetalleSoldaduraModel extends EntityModel {

  public Amperaje: number;
  public CantidadSoldadura: number;
  public Lote: number;
  public PresionAcetileno: number;
  public PresionGas1: number;
  public PresionGas2: number;
  public PresionOxigeno: number;
  public TemperaturaDespuesProceso: number;
  public TemperaturaDuranteProceso: number;
  public TemperaturaPrecalentamiento: number;
  public TiempoAplicacion: number;
  public TiempoPrecalentamiento: number;
  public Voltaje: number;
  public ModoAplicacionId: number
  public TamañoCortadoresId: number
  public TipoFuenteId: number
  public TipoSoldaduraId: number
  public ProcesoId: number
  public ModoAplicacion: CatalogoModel;
  public TamañoCortadores: CatalogoModel;
  public TipoFuente: CatalogoModel;
  public TipoSoldadura: CatalogoModel;
  public Proceso: ProcesoModel;
                                              
  constructor() {
    super();
  }
}
