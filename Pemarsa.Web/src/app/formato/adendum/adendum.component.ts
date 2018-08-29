import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EntidadModel, FormatoAdendumModel } from '../../common/models/Index';
import { TIPOSFORMATOADENDUM } from '../../common/enums/parametrosEnum';

@Component({
  selector: 'app-adendum',
  templateUrl: './adendum.component.html',
  styleUrls: ['./adendum.component.css']
})
export class AdendumComponent implements OnInit {

  @Input('tiposFormatos') public parametrosFormatoAdendumTiposFormatos: EntidadModel[] = new Array<EntidadModel>();

  @Input() public formatosAdendumModel: Array<FormatoAdendumModel> = new Array<FormatoAdendumModel>();

  public formAdendum: FormArray;
  public formulario: FormGroup;

  public tipos = [
    { Id: 27, Valor: 'BEV' },
    { Id: 26, Valor: 'O.D' }
  ]

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.iniciarFormulario();  
  }

  iniciarFormulario() {
    this.formulario = this.formBuilder.group({
      Adendum: this.formBuilder.array([])
    })
    this.initFormFormatoAdendum();
  }

  //adendum
  initFormFormatoAdendum() {

    this.formAdendum = this.formulario.get('Adendum') as FormArray;


    this.tipos
      .forEach(tipo => {
        let Position = 1
        while (Position < 9 && this.formatosAdendumModel.length < 16) {
          let formato: FormatoAdendumModel = new FormatoAdendumModel();
          if (tipo.Id == 26) {
            formato.Posicion = Position;
            formato.TipoId = tipo.Id

          } else if (tipo.Id == 27) {
            formato.Posicion = Position;
            formato.TipoId = tipo.Id
          }
          Position++;
          this.formatosAdendumModel.push(formato)
        }
      })
    console.log(this.formatosAdendumModel)

    this.formatosAdendumModel.filter(t => t.TipoId == TIPOSFORMATOADENDUM.BEV).sort((a, b) => a.Posicion - b.Posicion).forEach(p => {
      let form = this.formBuilder.group({});
      form.addControl('Id', new FormControl(p.Id ? p.Id : 0));
      form.addControl('Posicion', new FormControl(p.Posicion));
      form.addControl('TipoId', new FormControl(p.TipoId));
      form.addControl('Valor', new FormControl(p.Valor));
      this.formAdendum.push(form);



    })
    this.formatosAdendumModel.filter(t => t.TipoId == TIPOSFORMATOADENDUM["O.D"]).sort((a, b) => a.Posicion - b.Posicion).forEach(p => {
      let form = this.formBuilder.group({});
      form.addControl('Id', new FormControl(p.Id ? p.Id : 0));
      form.addControl('Posicion', new FormControl(p.Posicion));
      form.addControl('TipoId', new FormControl(p.TipoId));
      form.addControl('Valor', new FormControl(p.Valor));
      this.formAdendum.push(form);



    })



  }

}
