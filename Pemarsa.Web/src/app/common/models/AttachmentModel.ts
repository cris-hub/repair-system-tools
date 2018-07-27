import { EntityModel } from "./EntityModel";

export class AttachmentModel extends EntityModel{
  public Nombre: string;
  public Descripcion: string;
  public NombreArchivo: string;
  public Ruta: string;
  public Extension: string;
  public Stream: string;
  public Id: number;
  public Guid: string;
  constructor() {
    super();
    this.NombreArchivo = '';
  }
}
