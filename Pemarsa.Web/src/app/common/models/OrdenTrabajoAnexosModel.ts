import { OrdenTrabajoModel } from "./OrdenTrabajoModel";
import { AttachmentModel } from "./AttachmentModel";

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
