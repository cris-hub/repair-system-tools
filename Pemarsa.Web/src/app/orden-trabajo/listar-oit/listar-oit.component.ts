import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenTrabajoModel, PaginacionModel, ParametrosModel, HerramientaModel } from '../../common/models/Index';
import { OrdenTrabajoService } from '../../common/services/entity/orden-trabajo.service';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { ConfirmacionComponent } from '../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-oit',
  templateUrl: './listar-oit.component.html',
  styleUrls: ['./listar-oit.component.css']
})
export class ListarOitComponent implements OnInit {
  @ViewChild(ConfirmacionComponent) confirmar: ConfirmacionComponent;

  private parametrosEstadoOrden: ParametrosModel;
  private ordenesTrabajo: Array<OrdenTrabajoModel> = new Array<OrdenTrabajoModel>();


  private paginacion: PaginacionModel;

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.parametrosEstadoOrden = new ParametrosModel();
    this.paginacion = new PaginacionModel(1, 30)
    this.consultarParametros();
    this.consultarOrdenesDeTrabajo();
  }

  consultarOrdenesDeTrabajo() {
    this.ordenTrabajoService.consultarOrdenesDeTrabajo(this.paginacion)
      .subscribe(response => {
        this.ordenesTrabajo = response.Listado;
        this.inicializarHerramienta();
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
  }

  private inicializarHerramienta() {
    this.ordenesTrabajo.forEach(c => {
      if (!c.Herramienta) {
        c.Herramienta = new HerramientaModel();
      }
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

  actualizarEstadoOIT(oit: OrdenTrabajoModel, estado: string) {
    this.ordenTrabajoService.actualizarEstadoOrdenDeTrabajo(oit.Guid, estado)
      .subscribe(response => {
        if (response) {
          this.toastr.success('Se actualizó el estado de la OIT', '');
        }
        this.consultarOrdenesDeTrabajo();
      })
  }

  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.confirmar.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }

  actualizarEstadoOITConfirmacion(event: any) {
    if (event.response == true) {
      this.actualizarEstadoOIT(event.oit, event.estado);
    }
    else {
      this.consultarOrdenesDeTrabajo();
    }
  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("ORDEN_TRABAJO")
      .subscribe(response => {
        this.parametrosEstadoOrden.Catalogos = response.Catalogos.filter(c => { return c.Grupo == 'ESTADOS_ORDENTRABAJO' });
      });
  }

}
