import { Pipe, PipeTransform } from '@angular/core';
import { CONEXIONID, TIPOSFORMATOADENDUM } from '../enums/parametrosEnum';
import { CatalogoModel } from '../models/Index';

@Pipe({
  name: 'pemarsaAdendumPipe',
  pure: false
})
export class pemarsaAdendumPipe implements PipeTransform {
  transform(items: any): any {



    if (!items || !items.controls) {
      return ;
    }
  

    let tipos = new Array<any>();
    items.tipos = []
    items.tipos = items.controls.forEach(c => {
      tipos.push({
        Id: c.value['TipoId'],
        Valor: ''
      })
    })

    items.tipos = tipos.filter((thing, index, self) =>
      index === self.findIndex((t) => (t.Id === thing.Id))
    )


    items.tipos.forEach(t => {
      t.Valor = TIPOSFORMATOADENDUM[t.Id]
    })
    return items
  }
}
