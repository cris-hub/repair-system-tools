import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FormatoParametroModel } from '../../common/models/Index';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit,OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  public formulario: FormGroup;
  public formFormatoPatamtros: FormArray;
  @Input() public parametros: Array<FormatoParametroModel> = new Array<FormatoParametroModel>();
  @Input() public alturar : string = ''

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.iniciarFormulario()
  }
  
  iniciarFormulario() {
    this.formulario = this.formBuilder.group({
      Parametros: this.formBuilder.array([]),
    });
    this.initFormFormatoParamtros();
  }

  initFormFormatoParamtros() {
    this.formFormatoPatamtros = this.formulario.get('Parametros') as FormArray;
    

    this.parametros.forEach(f => {
      let form = this.formBuilder.group({
        Id: [f.Id],
        Item: [f.Item],
        Parametro: [f.Parametro],
        DimensionEspecifica: [f.DimensionEspecifica],
        ToleranciaMin: [f.ToleranciaMin],
        ToleranciaMax: [f.ToleranciaMax],
      });
      this.formFormatoPatamtros.push(form)
    });
  }

  addItemFormParametro(): void {
    this.formFormatoPatamtros = this.formulario.get('Parametros') as FormArray;
    this.formFormatoPatamtros.push(this.crearFormFormatoParametroModel());
    console.log(this.formFormatoPatamtros);
  }


  removeItemFormFormatoPatamtros(i) {
    this.formFormatoPatamtros.removeAt(i);
  }

  crearFormFormatoParametroModel(): any {
    let formatoParametrosModel = this.formBuilder.group({
      DimensionEspecifica: '',
      Item: '',
      Parametro: '',
      ToleranciaMin: '',
      ToleranciaMax: '',


    });


    return formatoParametrosModel;
  }

}
