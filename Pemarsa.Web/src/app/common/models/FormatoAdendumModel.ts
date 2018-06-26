import { EntityModel, HerramientaModel, AttachmentModel, CatalogoModel } from "./Index";

export class FormatoAdendumModel  {

  constructor(
    public Id?: number,
    public Posicion?: number,
    public TipoId?: number,
    public Valor?: string,
    public Tipo?: CatalogoModel,


    public FormatoId?: number
    
  ) {
  }


}

