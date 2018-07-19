import { EntityModel, AttachmentModel,  OrdenTrabajoModel } from "./Index";

export class OrdenTrabajoAnexosModel {
  public Estado: boolean;
  public OrdenTrabajoModelId: number;
  public DocumentoAdjuntoId: number;
  public OrdenTrabajoModel: OrdenTrabajoModel;
  public DocumentoAdjunto: AttachmentModel;

  constructor() {

    this.DocumentoAdjunto = new AttachmentModel();
  }
}
