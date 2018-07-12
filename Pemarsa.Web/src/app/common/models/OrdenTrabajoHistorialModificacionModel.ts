import { OrdenTrabajoModel } from "./Index";

export class OrdenTrabajoHistorialModificacionModel {
  
  public Campo: string;
  
  public FechaModificacion: Date;
  
  public Guid: string;
  
  public GuidUsuarioModifica: string;
  
  public Id: number;
  
  public UsuarioModifica: string;
  
  public ValorAnterior: string;
  
  public OrdenTrabajoId: number;

  public OrdenTrabajo: OrdenTrabajoModel;

  constructor() {

  }
}
