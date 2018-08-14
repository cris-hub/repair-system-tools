import { Pipe, PipeTransform } from '@angular/core';
import { CONEXIONID } from '../enums/parametrosEnum';
import { ParametrosModel, CatalogoModel, EntidadModel } from '../models/Index';

@Pipe({
  name: 'CatalogoPipe',
  pure: false
})
export class CatalogoPipe implements PipeTransform {
  transform(item: any, parametros: EntidadModel[]): any {
    if (!item || !parametros) {
      return '';
    }

    let catlogo: CatalogoModel = parametros.find(d => d.Id == item);



    return catlogo.Valor;
  }
}
