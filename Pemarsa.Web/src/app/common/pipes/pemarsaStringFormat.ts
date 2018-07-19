import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pemarsaStringFormat' })
export class PemarsaStringFormat implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";

    for (var i = 0; i < value.length; i++) {
      if (!(value.charAt(i) == ' ')) {
        newStr  += value.charAt(i);
      }
    }

    return newStr.toLocaleLowerCase();
  }
}
