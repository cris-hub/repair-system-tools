import { AttachmentModel } from "./AttachmentModel";
import { CatalogoModel } from "./CatalogoModel";
import { FormatoAdendumModel } from "./FormatoAdendumModel";
import { FormatoTiposConexionModel } from "./FormatoTiposConexionModel";
import { EntityModel } from "./EntityModel";
import { FormatoFormatoParametroModel } from "./FormatoFormatoParametroModel";
import { HerramientaModel } from "./Index";

export class FormatoModel extends EntityModel {

  constructor(
    public Planos?: Array<AttachmentModel>,
    public Adendum?: Array<FormatoAdendumModel>,
    public FormatoTiposConexion?: Array<FormatoTiposConexionModel>,
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
    
    public ConexionId?: number,
    public Conexion?: CatalogoModel,
    public ConexionValor?: string, 
    public DocumentoVista?: string, 
    public EsFormatoAdjunto?:boolean,
    public esAletas?: boolean,

    public AdjuntoId?: number,
    public Adjunto?:AttachmentModel

  ) {
    super();
    
    this.Adendum = new Array<FormatoAdendumModel>()
    this.Planos = new Array<AttachmentModel>()
    this.FormatoTiposConexion = new Array<
      FormatoTiposConexionModel>()
  }


}

