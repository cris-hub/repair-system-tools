import { AttachmentModel, InspeccionModel } from "./Index";

export class InspeccionFotosModel {

  public DocumentoAdjuntoId: number
  public DocumentoAdjunto: AttachmentModel


  public InspeccionId: number
  public Inspeccion: InspeccionModel

  constructor() {
  };
}

