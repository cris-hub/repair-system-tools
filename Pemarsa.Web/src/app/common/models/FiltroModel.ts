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
