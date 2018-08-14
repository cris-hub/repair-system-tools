import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { FiltroModel, FiltroParametrosProcesosoModel, EntidadModel } from '../../common/models/Index';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProcesoService } from '../../common/services/entity';
import { ParametroService } from '../../common/services/entity/parametro.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-filtro-proceso',
  templateUrl: './filtro-proceso.component.html',
  styleUrls: ['./filtro-proceso.component.css']
})
export class FiltroProcesoComponent implements OnInit{

  
  public formulario: FormGroup;
  public filtro: FiltroParametrosProcesosoModel;
  @Input() estadosCatalogo: any;
  @Output() paramsFiltro = new EventEmitter();
  public catalogoEstados: EntidadModel[] = [];
  public catalogoPrioridad: EntidadModel[] = [];

  constructor(
    private frmBuilder: FormBuilder,
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
  ) {

  }
  ngOnInit(): void {
    this.filtro = new FiltroParametrosProcesosoModel(1, 30);
    this.initForm();
    
  }

  initForm() {
    this.formulario = this.frmBuilder.group({
      HerraminetaNombre: [this.filtro.HerraminetaNombre],
      ClienteNickname: [this.filtro.ClienteNickname],
      SerialHerramienta: [this.filtro.SerialHerramienta],
      OrdenTrabajoPrioridad: [this.filtro.OrdenTrabajoPrioridad],
      Fecha: [this.filtro.Fecha],
      Estado: [this.filtro.Estado],
    });
  }

  conultarParametros() {
    if ((this.catalogoEstados.length > 0 && this.catalogoPrioridad.length >0)) {
      return
    }
    this.parametroService.consultarParametrosPorEntidad('ORDEN_TRABAJO').subscribe(
      response => {
        this.catalogoPrioridad = response.Catalogos.filter(d => d.Grupo == 'PRIORIDAD_ORDENTRABAJO');
      });
    this.parametroService.consultarParametrosPorEntidad('PROCESO').subscribe(
      response => {
        this.catalogoEstados = response.Catalogos.filter(d => d.Grupo == 'ESTADOS_PROCESO');
      });
  }

  submitFiltro(filtroGroup: any) {
    this.filtro = <FiltroParametrosProcesosoModel>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }


  limpiarFormulario() {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation();
    });
    this.formulario.reset(new FiltroParametrosProcesosoModel(1, 30));
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    if (event.target.tagName == "SELECT") {
      event.stopPropagation();
    }
  }
}
