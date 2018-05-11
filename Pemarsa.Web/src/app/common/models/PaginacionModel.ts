export class PaginacionModel {
  public TotalRegistros: number;

  constructor(public PaginaActual: number, public CantidadRegistros: number) {
  }
}
