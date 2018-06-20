import { EntityModel, HerramientaModel, AttachmentModel, CatalogoModel } from "./Index";

export class FormatoAdendumModel extends EntityModel {

  constructor(
    public Id: number,
    public Posicion : number,
    public Tipo: CatalogoModel,
    public Valor : string,
  ) {
    super();
  }


}

