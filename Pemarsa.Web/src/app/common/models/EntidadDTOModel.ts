export class EntidadModel {
  public Id: number;
  public Guid: string;
  public Valor: string;
  public Grupo: string;
  public Simbolo: string;
  public Estado: boolean;
  public CatalogoId: number;
  public Dia: number;

  public SubCatalogos: EntidadModel[];

  constructor() {
    this.SubCatalogos = new Array<EntidadModel>();
  }
}
