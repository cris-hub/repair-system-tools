import { InspeccionModel,  HerramientaModel, AttachmentModel, ClienteModel, CatalogoModel, InspeccionConexionFormatoAdendumModel, InspeccionConexionFormatoParametrosModel } from "./Index";

export class InspeccionConexionFormatoModel {


  public Id : number

  public EsBoreBack: boolean

  public EsCw: boolean

  public EsEstampado: boolean

  public EsStandBlasting: boolean

  public EstaConforme :boolean

  public FlatBoardId : number

  public FlatBoardLongitud

  public GuIdUsuarioElabora: string

  public Od: number

  public OIT: number

  public NombreUsuarioElabora: string

  public Serial:string


  public FloatValveId : number
  public FloatValve


  public EquipoUsadoId : number
  public EquipoUsado :CatalogoModel




  public InspeccionConexionFormatoAdendumId : number
  public InspeccionConexionFormatoAdendum  :InspeccionConexionFormatoAdendumModel



  public InspeccionConexionFormatoParametrosId : number
  public InspeccionConexionFormatoParametros: InspeccionConexionFormatoParametrosModel



  public ClienteId : number
  public Cliente : ClienteModel


  public FormatoAdjuntoId : number
  public DocumentoAdjunto :AttachmentModel

  public HerramientaId : number
  public Herramienta: HerramientaModel

  constructor() {
  };
}

