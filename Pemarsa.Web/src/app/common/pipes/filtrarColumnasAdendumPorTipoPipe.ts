import { Pipe, PipeTransform } from '@angular/core';
import { CONEXIONID, TIPOSFORMATOADENDUM } from '../enums/parametrosEnum';
import { CatalogoModel } from '../models/Index';

@Pipe({
  name: 'filtrarColumnasAdendumPorTipoPipe',
  pure: false
})
export class filtrarColumnasAdendumPorTipoPipe implements PipeTransform {
  transform(items: any, q: any): any {
    if (!q || !items)
      return
    let Items26 = items.filter(grupo => grupo.controls['TipoId'].value == 26)
    let Items27 = items.filter(grupo => grupo.controls['TipoId'].value == 27)
    return q.Id == 26 ? Items26 : Items27
  }
}
