import { Pipe, PipeTransform } from '@angular/core';
import { CONEXIONID } from '../enums/parametrosEnum';

@Pipe({
  name: 'filterEstadoConexionPorConexion',
  pure: false
})
export class filterEstadoConexionPorConexion implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out

    let estadosPIN: any[] = items.filter(item => item.Grupo.indexOf(CONEXIONID[filter]) !== -1);
    let estadosBOX: any[] = items.filter(item => item.Grupo.indexOf(CONEXIONID[filter]) !== -1);

    if (estadosPIN && filter == CONEXIONID.ESTADOS_CONEXION_PIN )
      return estadosPIN
    else if (estadosBOX && filter == CONEXIONID.ESTADOS_CONEXION_BOX ) 
      return estadosBOX
    return items
  }
}
