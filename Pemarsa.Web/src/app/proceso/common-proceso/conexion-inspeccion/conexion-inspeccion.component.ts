import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { InspeccionConexionModel, InspeccionModel } from '../../../common/models/Index';
import { TIPO_INSPECCION, ALERTAS_ERROR_MENSAJE, ALERTAS_ERROR_TITULO, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ESTADOS_PROCESOS, TIPOS_CONEXION, CONEXION, ALERTAS_INFO_MENSAJE } from '../../inspeccion-enum/inspeccion.enum';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-conexion-inspeccion',
  templateUrl: './conexion-inspeccion.component.html',
  styleUrls: ['./conexion-inspeccion.component.css']
})
export class ConexionInspeccionComponent implements OnInit {
  public formInpeccionVisualDimensional: FormGroup
  public formConexiones: any

  public inspeccion: InspeccionModel = new InspeccionModel();
  constructor(
    private formBuider: FormBuilder,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.iniciarFormulario()
  }

  iniciarFormulario() {
    this.formInpeccionVisualDimensional = this.formBuider.group({
      InspeccionEquipoUtilizado: [this.inspeccion.InspeccionEquipoUtilizado],
      Conexiones: this.formBuider.array([])
    });
    this.crearFormConexiones()
  }

  crearFormConexiones(): any {

    if (!this.formInpeccionVisualDimensional) {
      return
    }

    this.formConexiones = this.formInpeccionVisualDimensional.get('Conexiones') as FormArray;

    let posicion = this.formConexiones.controls.length


    while (this.inspeccion.Conexiones.length < 3) {
      this.inspeccion.Conexiones.push(new InspeccionConexionModel())

    }



    this.inspeccion.Conexiones.forEach((p, i) => {


      let form = this.formBuider.group({});
      form.addControl('NumeroConexion', new FormControl(posicion += 1));
      form.addControl('Id', new FormControl(p.Id));
      form.addControl('ConexionId', new FormControl(p.ConexionId));
      form.addControl('TipoConexionId', new FormControl(p.TipoConexionId));
      form.addControl('EstadoId', new FormControl(p.EstadoId));
      form.addControl('Observaciones', new FormControl(p.Observaciones));
      this.formConexiones.push(form);
      this.cuandoEsNoAplica(p.ConexionId, i)

    })

  }

  cuandoEsNoAplica(event, i) {
    let formArray = this.formInpeccionVisualDimensional.get('Conexiones') as FormArray;
    let formGroup = formArray.get(i.toString());
    if (event == CONEXION.NOAPLICA || formGroup.get('ConexionId').value == (CONEXION.NOAPLICA)) {
      let cantidadConexioneNoAplican = formArray.controls.filter(d => d.get('ConexionId').value == CONEXION.NOAPLICA).length;
      if (cantidadConexioneNoAplican > 2) {
        formGroup.get('ConexionId').setValue(0);
        this.toastrService.info(ALERTAS_INFO_MENSAJE.maximoNoAplica);
        return
      }

      formGroup.reset({
        NumeroConexion: formGroup.get('NumeroConexion').value,
        ConexionId: CONEXION.NOAPLICA,
        EstadoId: null,
        TipoConexionId: null,
        Observaciones: '',
        Id: 0


      })
      formGroup.disable()
      formGroup.get('ConexionId').enable();
      formGroup.get('ConexionId').setValue(CONEXION.NOAPLICA)

      console.log(formGroup);

    } else {
      formGroup.enable();
    }
    console.log(event)
  }
}
