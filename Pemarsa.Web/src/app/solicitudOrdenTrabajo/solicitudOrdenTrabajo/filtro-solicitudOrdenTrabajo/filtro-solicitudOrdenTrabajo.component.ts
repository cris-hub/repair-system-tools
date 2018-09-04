import { Component, OnInit, Input, Output, HostListener, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import * as $ from 'jquery';
import { CatalogoModel } from "../../../common/models/CatalogoModel";
import { FiltroSolicitudOrdenTrabajoModel } from "../../../common/models/FiltroModel";
import { ParametrosModel } from "../../../common/models/ParametrosModel";

@Component({
  selector: 'app-filtro-solicitudOrdenTrabajo',
  templateUrl: './filtro-solicitudOrdenTrabajo.component.html'
})
export class FiltroSolicitudOrdenTrabajoComponent {
  
  public frmFiltroOit: FormGroup;
  public filtro: any;
  public Prioridades: CatalogoModel[] = new Array<CatalogoModel>();
  public Estados: CatalogoModel[] = new Array<CatalogoModel>();
  private parametros: ParametrosModel;
  @Output() paramsFiltro = new EventEmitter();

  constructor(private frmBuilder: FormBuilder, public parametroSrv: ParametroService) {
    this.filtro = new FiltroSolicitudOrdenTrabajoModel(1, 30);
    this.initForm();
    this.consultarParametros(); 
  }

  initForm() {
    this.frmFiltroOit = this.frmBuilder.group({
      Responsable: [this.filtro.Responsable],
      Cliente: [this.filtro.Cliente],
      ClienteLinea: [this.filtro.ClienteLinea],
      Prioridad: [this.filtro.Prioridad],
      DetallesSolicitud: [this.filtro.DetallesSolicitud],
      Estado: [this.filtro.Estado]
    });
  }
  submitFiltro(filtroGroup: any) {
    this.filtro = <FiltroSolicitudOrdenTrabajoModel>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("SOLICITUD")
      .subscribe(response => {
        this.parametros = response;
        this.Estados = this.parametros.Catalogos.filter(e => e.Grupo == "ESTADOS_SOLICITUD");
        this.Prioridades = this.parametros.Catalogos.filter(e => e.Grupo == "PRIORIDAD_SOLICITUD");
      });
  }

  limpiarFormulario() {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation();
    });
    this.frmFiltroOit.reset(new FiltroSolicitudOrdenTrabajoModel(1, 30));
    this.filtro = new FiltroSolicitudOrdenTrabajoModel(1, 30);
    this.paramsFiltro.emit(this.filtro);
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    if (event.target.tagName == "SELECT") {
      event.stopPropagation();
    }
  }
}
