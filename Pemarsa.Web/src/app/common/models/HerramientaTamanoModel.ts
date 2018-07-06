import { EntityModel } from "./EntityModel";
import { HerramientaModel } from "./HerramientaModel";

export class HerramientaTamanoModel extends EntityModel {
  public Tamano: string;
  public Estado: boolean;
  public HerramientaId: number;

  constructor() {
    super();
  }
}
