import { InspeccionModel,  HerramientaModel, AttachmentModel, ClienteModel, CatalogoModel, InspeccionConexionFormatoAdendumModel, InspeccionConexionFormatoParametrosModel, ConexionEquipoMedicionUsadoModel } from "./Index";

export class InspeccionConexionFormatoModel {


  public Id : number

  public EsBoreBack: boolean

  public EsCw: boolean

  public EsEstampado: boolean

  public EsStandBlasting: boolean

  public EstaConforme :boolean

  public FloatBoardId : number

  public FloatBoardLongitud

  public GuIdUsuarioElabora: string

  public Od: number

  public OIT: number

  public NombreUsuarioElabora: string

  public Serial:string


  public FloatValveId : number
  public FloatValve: CatalogoModel


  


  public IdAsignaUsuario : number

  
  



  public ClienteId : number
  public Cliente : ClienteModel


  public FormatoAdjuntoId : number
  public DocumentoAdjunto :AttachmentModel

  public HerramientaId : number
  public Herramienta: HerramientaModel

  public InspeccionConexionFormatoAdendum: InspeccionConexionFormatoAdendumModel[]
  public ConexionEquipoMedicionUsado: ConexionEquipoMedicionUsadoModel[]

  public InspeccionConexionFormatoParametros: InspeccionConexionFormatoParametrosModel[]

  constructor() {
  };
}

