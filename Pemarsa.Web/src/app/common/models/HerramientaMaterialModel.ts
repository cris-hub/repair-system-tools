import { EntityModel } from "./EntityModel";
import { HerramientaModel } from "./HerramientaModel";
import { CatalogoModel } from "./CatalogoModel";


export class HerramientaMaterialModel extends EntityModel {
  public Estado: boolean;
  public HerramientaId: number;
  public Herramienta: HerramientaModel;
  public MaterialId: number;
  public Material: CatalogoModel;

  constructor() {
    super();
    this.Herramienta = new HerramientaModel();
    this.Material = new CatalogoModel();
  }
}
