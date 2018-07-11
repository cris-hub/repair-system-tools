import { EntityModel, AttachmentModel, SolicitudOrdenTrabajoModel } from "./Index";

export class SolicitudOrdenTrabajoAnexosModel {
  public Estado: boolean;
  public SolicitudOrdenTrabajoId: number;
  public DocumentoAdjuntoId: number;
  public SolicitudOrdenTrabajo: SolicitudOrdenTrabajoModel;
  public DocumentoAdjunto: AttachmentModel;

  constructor() {
    
    this.DocumentoAdjunto = new AttachmentModel();
  }
}
