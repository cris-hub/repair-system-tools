import { FormatoFormatoParametroModel } from "./Index";

export class FormatoParametroModel {

    constructor(
        public DimensionEspecifica?: string,
        public Id?: number,
        public Item?: string,
        public Parametro?: string,
        public ToleranciaMin?: string,
        public ToleranciaMax?: string,
        public FormatoId?: number,
        public FormatoFormatoParametro?: FormatoFormatoParametroModel
    ) {
    }




}

