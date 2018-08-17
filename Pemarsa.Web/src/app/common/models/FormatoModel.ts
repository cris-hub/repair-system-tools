import { EntityModel, HerramientaModel, AttachmentModel, FormatoAdendumModel, FormatoParametroModel, CatalogoModel, FormatoFormatoParametroModel } from "./Index";

export class FormatoModel extends EntityModel {

  constructor(
    public Planos?: Array<AttachmentModel>,
    public Adendum?: Array<FormatoAdendumModel>,
    public TipoFormatoId?: number,
    public TipoFormato?: CatalogoModel,
    public FormatoFormatoParametro?: Array<FormatoFormatoParametroModel>,
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
    public ConexionValor?: string, 
    public EsFormatoAdjunto?:boolean,
    public esAletas?: boolean,

    public AdjuntoId?: number,
    public Adjunto?:AttachmentModel

  ) {
    super();
    
    this.Adendum = new Array<FormatoAdendumModel>()
    this.Planos = new Array<AttachmentModel>()
  }


}

