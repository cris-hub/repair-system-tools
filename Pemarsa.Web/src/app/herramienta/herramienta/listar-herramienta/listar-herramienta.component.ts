import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";

import { HerramientaService } from '../../../common/services/entity/index';
import { PaginacionModel } from '../../../common/models/PaginacionModel';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ParametrosModel } from '../../../common/models/ParametrosModel';
import { ConfirmacionComponent } from '../../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
import { HerramientaModel } from "../../../common/models/Index";

import { FiltroHerramientaComponent } from '../filtro-herramienta/filtro-herramienta.component'
@Component({
  selector: 'app-listar-herramienta',
  templateUrl: './listar-herramienta.component.html'
})
export class ListarHerramientaComponent implements OnInit {
  public  registroSeleccionado: string;
  public  herramientas: HerramientaModel[];
  // paginacion
  public  paginacion: PaginacionModel;
  public  parametros: ParametrosModel;
  public  esFiltrar: boolean = false;

  constructor(
    public herramientaSrv: HerramientaService,
    public parametroSrv: ParametroService,
    private toastr: ToastrService) {
    this.paginacion = new PaginacionModel(1, 30);
    this.parametros = new ParametrosModel();
  }

  ngOnInit() {
    this.ConsultarHerramientas();
  }

  ConsultarHerramientas() {
    this.herramientaSrv.ConsultarHerramientas(this.paginacion)
      .subscribe(response => {
        this.herramientas = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
    
  }

  ConsultarHerramientasPorFiltro(filtro) {
    filtro.PaginaActual = this.paginacion.PaginaActual;
    filtro.CantidadRegistros = this.paginacion.CantidadRegistros;
    this.herramientaSrv.ConsultarHerramientasPorFiltro(filtro)
      .subscribe(response => {
        this.herramientas = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
        //this.sortedCollection = this.orderPipe.transform(this.clientes, 'RazonSocial');
      });
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.ConsultarHerramientas();
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.ConsultarHerramientas();
  }
}
