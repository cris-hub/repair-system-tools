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
