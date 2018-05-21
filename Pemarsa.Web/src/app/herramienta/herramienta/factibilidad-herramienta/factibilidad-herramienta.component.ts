import { Component, Input, Output, EventEmitter, Renderer2 } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ClienteLineaModel } from "../../../common/models/ClienteLineaModel";
import { HerramientaEstudioFactibilidadModel } from "../../../common/models/Index";

@Component({
  selector: 'app-factibilidad-herramienta',
  templateUrl: './factibilidad-herramienta.component.html'
})
export class FactibilidadHerramientaComponent {
  public data: any = {};
  public frmHerramientaEstudioFactibilidad: FormGroup;
  private HerramientaEstudioFactibilidad: HerramientaEstudioFactibilidadModel;
  private estados: any = {};
  //@Input() ClienteLinea: ClienteLineaModel;
  @Input() accion: any;
  @Output() paramsHerramientaEstudioFactibilidad = new EventEmitter();
  constructor(private frmBuilder: FormBuilder) {
    this.HerramientaEstudioFactibilidad = new HerramientaEstudioFactibilidadModel();
    this.initForm();
  }

  llenarObjectoCliente(HerramientaEstudioFactibilidadObj: HerramientaEstudioFactibilidadModel, accion: any, index: any) {
    this.HerramientaEstudioFactibilidad.Id = HerramientaEstudioFactibilidadObj.Id;
    this.HerramientaEstudioFactibilidad.Admin = HerramientaEstudioFactibilidadObj.Admin;
    this.HerramientaEstudioFactibilidad.ManoObra = HerramientaEstudioFactibilidadObj.ManoObra;
    this.HerramientaEstudioFactibilidad.Mantenimiento = HerramientaEstudioFactibilidadObj.Mantenimiento;
    this.HerramientaEstudioFactibilidad.Maquina = HerramientaEstudioFactibilidadObj.Maquina;
    this.HerramientaEstudioFactibilidad.Material = HerramientaEstudioFactibilidadObj.Material;
    this.HerramientaEstudioFactibilidad.Metodo = HerramientaEstudioFactibilidadObj.Metodo;
    this.HerramientaEstudioFactibilidad.HerramientaId = HerramientaEstudioFactibilidadObj.HerramientaId;
    this.accion = accion;
    this.data.index = index;
    this.initForm();

  }
  nuevoDataLineaCliente(accion: any) {
    this.HerramientaEstudioFactibilidad = new HerramientaEstudioFactibilidadModel();
    this.HerramientaEstudioFactibilidad.Id = 0;
    this.HerramientaEstudioFactibilidad.HerramientaId = 0;
    this.accion = accion;
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
  submitlineaCliente(HerramientaEstudioFactibilidadGroup: any) {
    this.HerramientaEstudioFactibilidad = <HerramientaEstudioFactibilidadModel>HerramientaEstudioFactibilidadGroup;
    this.data.HerramientaEstudioFactibilidad = this.HerramientaEstudioFactibilidad;
    this.data.accion = this.accion;
    console.log(this.HerramientaEstudioFactibilidad);
    this.paramsHerramientaEstudioFactibilidad.emit(this.data);
    this.HerramientaEstudioFactibilidad = new HerramientaEstudioFactibilidadModel();
  }

  limpiarHerramientaEstudioFactibilidad() {
    this.HerramientaEstudioFactibilidad = new HerramientaEstudioFactibilidadModel();
    this.initForm();
  }

}
