import { EntityModel, HerramientaModel, AttachmentModel, FormatoAdendumModel, FormatoParametroModel, CatalogoModel } from "./Index";

export class FormatoModel extends EntityModel {

  constructor(
    public Planos: Array<AttachmentModel>,
    public Adendum?: Array<FormatoAdendumModel>,
    public TipoFormatoId?: number,
    public TipoFormato?: CatalogoModel,
    public Parametros?: Array<FormatoParametroModel>,
    public Codigo?: string,
    public Herramienta?: HerramientaModel,
    public HerramientaId?: number,
    public EspecificacionId?: number,
    public Especificacion?: CatalogoModel,
    public TPI?: string,
    public TPF?: string,
    public TiposConexionesId?: number,
    public TipoConexion?: CatalogoModel,
    public ConexionId?: number,
    public Conexion?: CatalogoModel,
    public EsFormatoAdjunto?:boolean,
    public Aletas?: boolean,
  ) {
    super();
  }


}

