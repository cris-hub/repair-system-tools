import { Directive, ElementRef, Input, HostListener, Renderer2, SimpleChanges, OnChanges } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[validacion]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidacionDirective,
      multi: true
    }
  ]
})

export class ValidacionDirective implements Validator,OnChanges {

  @Input() validaciones: string[];
  @Input() control: AbstractControl;
  private objectError;
  public strong;
  public text;
  public mensaje: string = '';
  public textoInput: string;
  private _onChange: () => void;
  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
  ngOnChanges(changes: SimpleChanges): void {

    if ('validaciones' in changes) {

      if (this._onChange) this._onChange();
    }

    

  }

  /**
   * - se mejoraria si se logra escuchar el evento submit
   * - si se logra asignar al FormControl que sea invalido seria mas eficiente la directiva
   * y ahorraria codigo en el componente padre
   */

  constructor(private elemento: ElementRef, private renderer: Renderer2) {
    this.validaciones = new Array<string>();
    this.mensaje = "";
    this.strong = this.renderer.createElement('strong');
    this.text = this.renderer.createText(this.mensaje);
    this.renderer.appendChild(this.strong, this.text);
    this.renderer.appendChild(this.elemento.nativeElement.parentElement, this.strong);

  }



  // escucha el evento del boton que va ha hacer submit

  @HostListener('focusout')
  focusOut() {
    this.asignar();
  }


  @HostListener('blur')
  blur() {
    this.asignar();
  }
  @HostListener('keyup')
  keyup() {
    this.asignar();
  }
  @HostListener('input')
  input() {
    this.asignar();
  }

  @HostListener('document:submit')
  onsubmit() {
    this.asignar();
  }


  validate(c: AbstractControl): { [key: string]: any; } {

    this.textoInput = c.value == null ? '' : c.value;

    this.mensaje = this.ListaValidaciones();

    if (this.mensaje != '') {
      return { error: this.mensaje };
    }
    return null;

  }



  ListaValidaciones(): string {
    
    for (let validaciones of this.validaciones) {

      // tipos de validaciones se la validacion requiere de un parametro se le asigna ejem: "typovalidacion:parametro"
      let tipoValidacion = validaciones.split(':')[0];
      let valor = validaciones.split(':').length > 0 ? validaciones.split(':')[1] : '';

      switch (tipoValidacion) {
        case "requerido": {
          this.mensaje = this.requerido();
          if (this.mensaje == '') { break; }
          else { return this.mensaje };
        }
        case "*": {
          this.mensaje = this.singo();
          if (this.mensaje == '') { break; }
          else { return this.mensaje };
        }
        case "minimo": {
          this.mensaje = this.minimo(valor);

          if (this.mensaje == '') { break; }
          else { return this.mensaje };
        }
        case "maximo": {
          this.mensaje = this.maximo(valor);

          if (this.mensaje == '') { break; }
          else { return this.mensaje };
        }
        case "correo": {
          this.mensaje = this.correo();

          if (this.mensaje == '') { break; }
          else { return this.mensaje };
        }
        case "numerico": {
          this.mensaje = this.numerico();

          if (this.mensaje == '') { break; }
          else { return this.mensaje };
        } case "decimal": {
          this.mensaje = this.decimal();

          if (this.mensaje == '') { break; }
          else { return this.mensaje };
        }
        default: {
          this.mensaje = "";

        }
      }
    }
    return this.mensaje;
  }


  //se le asigna el mensaje de validacion
  asignar() {
    if (this.mensaje != undefined) {
      this.renderer.removeChild(this.strong, this.text);
      this.text = this.renderer.createText(this.mensaje);
      this.renderer.addClass(this.strong, 'text-danger');
      this.renderer.addClass(this.strong, 'validaciones');
      this.renderer.appendChild(this.strong, this.text);

    }
  }


  //----- validaciones -------//

  requerido(): string {
    if (this.textoInput == '') {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  singo(): string {
    if (this.textoInput == '') {
      return '*';
    }
    return '';
  }


  minimo(valor: string): string {
    if (this.textoInput.length < Number(valor) && (this.textoInput.length > 0)) {
      return "Este campo requiere minimo " + valor + " digitos";
    }
    return '';
  }

  maximo(valor: string): string {
    if (this.textoInput.length > Number(valor) && ((this.textoInput.length > 0))) {
      return "Este campo no debe superar los " + valor + " digitos";
    }
    return '';
  }

  correo(): string {
    if (!(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(this.textoInput)) && (this.textoInput.length > 0)) {
      return "Este Correo electronico no es valido";
    }
    return '';
  }

  numerico(): string {
    if (!(/^([0-9])*$/.test(this.textoInput)) && (this.textoInput.length > 0)) {
      return "Este campo solo acepta numeros";
    } else {
      return '';
    }
  }

  decimal(): string {
    if ((/^[0-9]+([,][0-9]+)?$/.test(this.textoInput)) && (this.textoInput.length > 0)) {
      return "Este campo solo acepta decimales";
    } else {
      return '';
    }
  } 


}
