import { Component, OnInit } from '@angular/core';
import { RemisionService } from 'src/app/common/services/entity';
import { RemisionPendienteDTO } from 'src/app/common/models/RemisionPendienteDTO';
import { PaginacionModel } from 'src/app/common/models/Index';

@Component({
  selector: 'app-remisiones-listar',
  templateUrl: './remisiones-listar.component.html',
  styleUrls: ['./remisiones-listar.component.css']
})
export class RemisionesListarComponent implements OnInit {

  public remisiones: Array<RemisionPendienteDTO> = new Array<RemisionPendienteDTO>();
  public paginacion: PaginacionModel;
  public EsPorFiltro: boolean = false;
  public filtro: string;
  public filtros: any;

  constructor(
    private remisionService: RemisionService
  ) { }

  ngOnInit() {
    this.paginacion = new PaginacionModel(1, 30);
    this.consultarRemisionesPendientes();
  }

  consultarRemisionesPendientes() {
    this.remisionService.consultarRemisionesPendientes(this.paginacion)
      .subscribe(response => {
        this.remisiones = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      }, errorResponse => {
      }, () => {
      });
  }

  consultarRemisionesPendientesPorFiltro(filtro: any) {
    filtro.PaginaActual = this.paginacion.PaginaActual;
    filtro.CantidadRegistros = this.paginacion.CantidadRegistros;
    this.filtros = filtro;
    this.EsPorFiltro = true;
    this.remisionService.consultarRemisionesPendientesPorFiltro(filtro)
      .subscribe(response => {
        this.remisiones = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      }, errorResponse => {
      }, () => { });
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    if (this.EsPorFiltro) {
      this.consultarRemisionesPendientesPorFiltro(this.filtros);
    }
    else {
      this.consultarRemisionesPendientes();

    }
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    if (this.EsPorFiltro) {
      this.consultarRemisionesPendientesPorFiltro(this.filtros);
    }
    else {
      this.consultarRemisionesPendientes();
    }
  }

}
