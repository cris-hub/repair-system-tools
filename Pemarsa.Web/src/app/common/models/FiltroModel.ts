import { PaginacionModel } from './PaginacionModel';

export class FiltroModel extends PaginacionModel {
  public RazonSocial: string;
  public Nit: string;
  public Telefono: string;
  public Direccion: string;
  public Estado: string;

  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros);
    this.RazonSocial = "";
    this.Nit = "";
    this.Telefono = "";
    this.Direccion = "";
    this.Estado = "";
  }
}

export class FiltroFormatoModel extends PaginacionModel {
  public Codigo: string;
  public FechaCreacion: string;
  public FormatoAdjunto: string;
  public HerramientaId: string;
  public Conexion: string;
  public TipoConexion: string;
  public HerramientaGuid: string;

  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros);
    this.Codigo = '';
    this.FechaCreacion = '';
    this.FormatoAdjunto = '';
    this.HerramientaId = '';
    this.Conexion = '';
    this.TipoConexion = '';
    this.HerramientaGuid = '';
  }
}

export class FiltroHerramientaModel extends PaginacionModel {
  public Nombre: string;

  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros);
    this.Nombre = "";
  }
}

export class FiltroSolicitudOrdenTrabajoModel extends PaginacionModel {
  public Responsable: string;
  public Cliente: string;
  public ClienteLinea: string;
  public Prioridad: string;
  public DetallesSolicitud: string;
  public Estado: string;

  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros);
    this.Responsable = "";
    this.Cliente = "";
    this.ClienteLinea = "";
    this.Prioridad = "";
    this.DetallesSolicitud = "";
    this.Estado = "";
  }
}
export class FiltroOrdenTrabajoModel extends PaginacionModel {
  public NumeroOIT: string;
  public FechaCreacion: string;
  public FechaFinalizacion: string;
  public Remision: string;
  public Estado: number;
  public Responsable: number;
  public TipoServio: number;


  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros);
    this.NumeroOIT = "";
    this.FechaCreacion = "";
    this.FechaFinalizacion = "";
    this.Remision = "";
    this.Estado = 0;
    this.Responsable = 0;
    this.TipoServio = 0;
  }
}
export class FiltroParametrosProcesosoModel extends PaginacionModel {
  public OrdenTrabajoPrioridad: string
  public Estado: string
  public TipoProceso: string
  public NumeroOIT: string
  public HerraminetaNombre: string
  public ClienteNickname: string
  public SerialHerramienta: string
  public Fecha: string



  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros);
    this.OrdenTrabajoPrioridad = ''
    this.Estado = ''
    this.TipoProceso = ''
    this.NumeroOIT = ''
    this.HerraminetaNombre = ''
    this.ClienteNickname = ''
    this.SerialHerramienta = ''
    this.Fecha = ''
  }
}

export class FiltroOrdenTrabajoParaRemision extends PaginacionModel {
  public Id: string;
  public Guid: string;
  public Cliente: string;
  public Linea: string;
  public Herramienta: string;
  public Fecha: string;

  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros)
    this.Id = '';
    this.Guid = '';
    this.Cliente = '';
    this.Linea = '';
    this.Herramienta = '';
    this.Fecha = '';
  }
}

export class RemisionPendienteFiltroDTO extends PaginacionModel {
  public RemisionId: string;
  public GuidRemision: string;
  public OrdenTrabajoId: string;
  public Cliente: string;
  public Linea: string;
  public Herramienta: string;
  public Serial: string;
  public DetalleSolicitud: string;
  public Estado: string;
  public Fecha: string;

  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros)
    this.RemisionId = '';
    this.OrdenTrabajoId = '';
    this.Cliente = '';
    this.Linea = '';
    this.Herramienta = '';
    this.Fecha = '';
    this.Serial = '';
    this.DetalleSolicitud = '';
    this.Estado = '';

  }
}

