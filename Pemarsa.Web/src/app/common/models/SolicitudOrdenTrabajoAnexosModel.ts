import { EntityModel, AttachmentModel, SolicitudOrdenTrabajoModel } from "./Index";

export class SolicitudOrdenTrabajoAnexosModel extends EntityModel {
  public Estado: boolean;
  public SolicitudOrdenTrabajoId: number;
  public DocumentoAdjuntoId: number;
  public SolicitudOrdenTrabajo: SolicitudOrdenTrabajoModel;
  public DocumentoAdjunto: AttachmentModel;

  constructor() {
    super();
    this.SolicitudOrdenTrabajo = new SolicitudOrdenTrabajoModel();
    this.DocumentoAdjunto = new AttachmentModel();
  }
}