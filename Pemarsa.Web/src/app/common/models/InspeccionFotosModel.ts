import { AttachmentModel, InspeccionModel } from "./Index";

export class InspeccionFotosModel {

  public Estado: boolean;

  public DocumentoAdjuntoId: number
  public DocumentoAdjunto: AttachmentModel


  public InspeccionId: number
  public Inspeccion: InspeccionModel

  public Pieza : number

  constructor() {
  };
}

