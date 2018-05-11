export class CatalogoModel {
  public Id: number;
  public Guid: string;
  public Valor: string; 
  public Grupo: string; 
  public Simbolo: string; 
  public Estado: boolean; 
  public CatalogoId: number;         
  public Dia: number;
  public SubCatalogos: CatalogoModel[];

  constructor() {
    this.SubCatalogos = new Array<CatalogoModel>();
  }
}
