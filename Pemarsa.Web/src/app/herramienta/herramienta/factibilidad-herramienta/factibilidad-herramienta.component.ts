import { Component, Input, Output, EventEmitter, Renderer2, OnChanges, SimpleChanges, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ClienteLineaModel } from "../../../common/models/ClienteLineaModel";
import { HerramientaEstudioFactibilidadModel } from "../../../common/models/Index";

@Component({
  selector: 'app-factibilidad-herramienta',
  templateUrl: './factibilidad-herramienta.component.html'
})
export class FactibilidadHerramientaComponent implements OnInit, OnChanges {
  ngOnInit(): void {
    this.llenarObjectoEstudioFactibilidad(this.HerramientaEstudioFactibilidad, 'crear')
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  public data: any = {};
  public frmHerramientaEstudioFactibilidad: FormGroup;
  public  HerramientaEstudioFactibilidad: HerramientaEstudioFactibilidadModel;
  public  estados: any = {};
  //@Input() ClienteLinea: ClienteLineaModel;
  @Input() accion: any;
  @Output() paramsHerramientaEstudioFactibilidad = new EventEmitter();
  constructor(private frmBuilder: FormBuilder) {
    this.HerramientaEstudioFactibilidad = new HerramientaEstudioFactibilidadModel();
    this.initForm();
  }

  llenarObjectoEstudioFactibilidad(HerramientaEstudioFactibilidadObj: HerramientaEstudioFactibilidadModel, accion: any) {
    console.log(HerramientaEstudioFactibilidadObj);
    this.HerramientaEstudioFactibilidad.Id = HerramientaEstudioFactibilidadObj.Id;
    this.HerramientaEstudioFactibilidad.Admin = HerramientaEstudioFactibilidadObj.Admin;
    this.HerramientaEstudioFactibilidad.ManoObra = HerramientaEstudioFactibilidadObj.ManoObra;
    this.HerramientaEstudioFactibilidad.Mantenimiento = HerramientaEstudioFactibilidadObj.Mantenimiento;
    this.HerramientaEstudioFactibilidad.Maquina = HerramientaEstudioFactibilidadObj.Maquina;
    this.HerramientaEstudioFactibilidad.Material = HerramientaEstudioFactibilidadObj.Material;
    this.HerramientaEstudioFactibilidad.Metodo = HerramientaEstudioFactibilidadObj.Metodo;
    this.HerramientaEstudioFactibilidad.HerramientaId = HerramientaEstudioFactibilidadObj.HerramientaId;
    this.accion = accion;
    this.data.esEstudioFactibilidad = "";
    this.initForm();
  }
  nuevoDataEstudioFactibilidad(accion: any) {
    this.HerramientaEstudioFactibilidad = new HerramientaEstudioFactibilidadModel();
    this.HerramientaEstudioFactibilidad.Id = 0;
    this.HerramientaEstudioFactibilidad.HerramientaId = 0;
    this.accion = accion;
    this.data.esEstudioFactibilidad = "";
    this.initForm();
  }
  initForm() {
    this.frmHerramientaEstudioFactibilidad = this.frmBuilder.group({
      Id: [this.HerramientaEstudioFactibilidad.Id],
      Admin: [this.HerramientaEstudioFactibilidad.Admin],
      ManoObra: [this.HerramientaEstudioFactibilidad.ManoObra],
      Mantenimiento: [this.HerramientaEstudioFactibilidad.Mantenimiento],
      Maquina: [this.HerramientaEstudioFactibilidad.Maquina],
      Material: [this.HerramientaEstudioFactibilidad.Material],
      Metodo: [this.HerramientaEstudioFactibilidad.Metodo],
      HerramientaId: [this.HerramientaEstudioFactibilidad.HerramientaId],
      NombreUsuarioCrea: ['Admin'],//este campo debe ser actualizado con la api de seguridad
      GuidUsuarioCrea: ['00000000-0000-0000-0000-000000000000'],//este campo debe ser actualizado con la api de seguridad
      GuidOrganizacion: ['00000000-0000-0000-0000-000000000000']//este campo debe ser actualizado con la api de seguridad
    });
  }
  submitEstudioFactibilidad(HerramientaEstudioFactibilidadGroup: any) {
    this.HerramientaEstudioFactibilidad = <HerramientaEstudioFactibilidadModel>HerramientaEstudioFactibilidadGroup;
    this.data.HerramientaEstudioFactibilidad = this.HerramientaEstudioFactibilidad;
    this.data.accion = this.accion;
    let contador = 0;
    let contadorFalse = 0;
    for (let prop in this.HerramientaEstudioFactibilidad) {
      if (this.HerramientaEstudioFactibilidad[prop] == "null") {
        this.HerramientaEstudioFactibilidad[prop] = null;
      }
      if (this.HerramientaEstudioFactibilidad[prop] == null && prop != "Id" && prop != "HerramientaId") {
        contador++;
      }
      else if (this.HerramientaEstudioFactibilidad[prop] == "false") {
        contadorFalse++;
      }
    }
    if (contador > 0 && contador < 6) {
      this.data.esEstudioFactibilidad = "falta";
    }
    else {
      this.data.esEstudioFactibilidad = "ok";
    }
    if (contadorFalse >= 1) {
      this.data.esEstudioFactibilidad = "falta";
    }
    this.paramsHerramientaEstudioFactibilidad.emit(this.data);

  }

  limpiarHerramientaEstudioFactibilidad() {

    this.initForm();
  }

}
