import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TIPOSFORMATOADENDUM } from '../../common/enums/parametrosEnum';
import { EntidadModel } from '../../common/models/EntidadDTOModel';
import { FormatoAdendumModel } from '../../common/models/FormatoAdendumModel';

@Component({
  selector: 'app-adendum',
  templateUrl: './adendum.component.html',
  styleUrls: ['./adendum.component.css']
})
export class AdendumComponent implements OnInit,OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }
  @Input('tiposFormatos') public parametrosFormatoAdendumTiposFormatos: EntidadModel[] = new Array<EntidadModel>();

  @Input() public formatosAdendumModel: Array<FormatoAdendumModel> = new Array<FormatoAdendumModel>();
  @Input() public disable : boolean

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
    if (this.disable) 
      this.formulario.disable()
    
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
