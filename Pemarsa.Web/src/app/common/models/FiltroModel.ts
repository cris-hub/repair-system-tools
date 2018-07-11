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
  public HerramientaId: string;
  public Conexion: string;
  public TipoConexion: string;
  public HerramientaGuid: string;

  constructor(public PaginaActual: number, public CantidadRegistros: number) {
    super(PaginaActual, CantidadRegistros);
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
