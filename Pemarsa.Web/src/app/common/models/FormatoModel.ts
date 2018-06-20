import { EntityModel, HerramientaModel, AttachmentModel, FormatoAdendumModel } from "./Index";

export class FormatoModel extends EntityModel {

  constructor(
    public Planos: Array<AttachmentModel>,
    public Adendum: Array<FormatoAdendumModel>,
    public TipoFormatoId?: number,
    public Codigo?: string,
    public Herramienta?: HerramientaModel,
    public Especificacion?: string,
    public TPI?: string,
    public TPF?: string,
    public TipoConexionId?: number,
    public ConexionId?: number,
    public DocumentoAdjunto?:boolean,
    public Aletas?: boolean,
  ) {
    super();
  }


}

