import { CatalogoModel, AttachmentModel, OrdenTrabajoModel, EntityModel } from "src/app/common/models/Index";

export class RemisionModel extends EntityModel{
  public EstadoId: number;
  public Estado: CatalogoModel;

  public ImagenFacturaID: number;
  public ImagenFactura: AttachmentModel;

  public ImagenRemisionId: number;
  public ImagenRemision: AttachmentModel;

  public OrdenTrabajoId: number;
  public OrdenTrabajo: OrdenTrabajoModel;

  public NumeroFactura: number;
  public ValorFactura: number;

}
