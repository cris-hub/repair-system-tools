import { Component, OnInit } from '@angular/core';
import { OrdenTrabajoService } from 'src/app/common/services/entity/orden-trabajo.service';
import { ParametroService } from 'src/app/common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/services/entity/loaderService';
import { DatePipe } from '@angular/common';
import { OrdenTrabajoRemisionDTO, PaginacionModel } from 'src/app/common/models/Index';

@Component({
  selector: 'app-oit-terminadas-listar',
  templateUrl: './oit-terminadas-listar.component.html',
  styleUrls: ['./oit-terminadas-listar.component.css']
})
export class OitTerminadasListarComponent implements OnInit {


  public ordenesTrabajoRemision: Array<OrdenTrabajoRemisionDTO> = new Array<OrdenTrabajoRemisionDTO>();


  public paginacion: PaginacionModel;

  public filtro: string;

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.paginacion = new PaginacionModel(1, 1)
    this.consultarOrdenesDeTrabajo();
  }

  consultarOrdenesDeTrabajo() {
    this.loaderService.display(true);
    this.ordenTrabajoService.consultarOrdenDeTrabajoParaRemision(this.paginacion)
      .subscribe(response => {
        this.ordenesTrabajoRemision = response.Listado;
        this.ordenesTrabajoRemision.forEach((ot) => {
          ot.Fecha = this.datePipe.transform(ot.Fecha, "dd/MM/yyyy");
        });
        this.paginacion.TotalRegistros = response.CantidadRegistros;
        this.loaderService.display(false);
      });
  }

  consultarOrdenesDeTrabajoPorFiltro(filtro: any) {
    debugger;
    this.loaderService.display(true);
    filtro.PaginaActual = this.paginacion.PaginaActual;
    filtro.CantidadRegistros = this.paginacion.CantidadRegistros;
    this.ordenTrabajoService.consultarOrdenDeTrabajoParaRemisionPorFiltro(filtro)
      .subscribe(response => {
        this.ordenesTrabajoRemision = response.Listado;
        this.ordenesTrabajoRemision.forEach((ot) => {
          ot.Fecha = this.datePipe.transform(ot.Fecha, "dd/MM/yyyy");
        });
        this.paginacion.TotalRegistros = response.CantidadRegistros;
        this.loaderService.display(false);
      });

  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.consultarOrdenesDeTrabajo();
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.consultarOrdenesDeTrabajo();
  }

}
