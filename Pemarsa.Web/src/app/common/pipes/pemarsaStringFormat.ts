import { Pipe, PipeTransform } from '@angular/core';
import { ProcesoModel } from '../models/Index';

@Pipe({ name: 'pemarsaStringFormat' })
export class PemarsaStringFormat implements PipeTransform {
  transform(value: string, proceso:ProcesoModel): string {
    console.log(proceso)

    let newStr: string = "";

    for (var i = 0; i < value.length; i++) {
      if (!(value.charAt(i) == ' ')) {
        newStr  += value.charAt(i);
      }
    }
    if (newStr.toLocaleLowerCase() == 'visualdimensional') {
      if (proceso.OrdenTrabajo.Herramienta.EsHerramientaMotor) {
        newStr = 'visualdimensionalmotor'
      }
    }
   

    return newStr.toLocaleLowerCase();
  }
}
