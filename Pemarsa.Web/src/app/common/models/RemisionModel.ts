import { CatalogoModel, AttachmentModel, OrdenTrabajoModel } from "src/app/common/models/Index";

export class RemisionModel {
  public EstadoId: number;
  public Estado: CatalogoModel;

  public ImagenFacturaID: number;
  public ImagenFactura: AttachmentModel;

  public ImagenRemisionId: number;
  public ImagenRemsion: AttachmentModel;

  public OrdenTrabajoId: number;
  public OrdenTrabajo: OrdenTrabajoModel;

  public NumeroFactura: number;
  public ValorFactura: number;

}
