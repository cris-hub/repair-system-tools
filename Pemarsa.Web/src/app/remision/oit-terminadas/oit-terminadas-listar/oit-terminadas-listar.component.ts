import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenTrabajoService } from 'src/app/common/services/entity/orden-trabajo.service';
import { ParametroService } from 'src/app/common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/services/entity/loaderService';
import { DatePipe } from '@angular/common';
import { OrdenTrabajoRemisionDTO, PaginacionModel } from 'src/app/common/models/Index';
import { CrearRemisionService } from 'src/app/common/services/task/crearRemision.service';
import { RemisionDTO } from 'src/app/common/models/RemisionDTO';
import { ConfirmacionComponent } from 'src/app/common/directivas/confirmacion/confirmacion.component';

@Component({
  selector: 'app-oit-terminadas-listar',
  templateUrl: './oit-terminadas-listar.component.html',
  styleUrls: ['./oit-terminadas-listar.component.css']
})
export class OitTerminadasListarComponent implements OnInit {


  public ordenesTrabajoRemision: Array<OrdenTrabajoRemisionDTO> = new Array<OrdenTrabajoRemisionDTO>();
  @ViewChild(ConfirmacionComponent) confirmar: ConfirmacionComponent;
  public ListGuidsOrdenTrabajo: Array<string> = new Array<string>();
  public Remision: RemisionDTO = new RemisionDTO();


  public paginacion: PaginacionModel;

  public filtro: string;
  public EsPorFiltro: boolean = false;
  public filtros: any;
  public remisionModel: OrdenTrabajoRemisionDTO = new OrdenTrabajoRemisionDTO();

  constructor(
    private remisionService: CrearRemisionService,
    private ordenTrabajoService: OrdenTrabajoService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.paginacion = new PaginacionModel(1, 30)
    this.consultarOrdenesDeTrabajo();
  }

  consultarOrdenesDeTrabajo() {
    this.ordenTrabajoService.consultarOrdenDeTrabajoParaRemision(this.paginacion)
      .subscribe(response => {
        this.ordenesTrabajoRemision = response.Listado;
        this.ordenesTrabajoRemision.forEach((ot) => {
          ot.Fecha = this.datePipe.transform(ot.Fecha, "dd/MM/yyyy");
        });
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
  }

  consultarOrdenesDeTrabajoPorFiltro(filtro: any) {
    filtro.PaginaActual = this.paginacion.PaginaActual;
    filtro.CantidadRegistros = this.paginacion.CantidadRegistros;
    this.filtros = filtro;
    this.EsPorFiltro = true;
    this.ordenTrabajoService.consultarOrdenDeTrabajoParaRemisionPorFiltro(filtro)
      .subscribe(response => {
        this.ordenesTrabajoRemision = response.Listado;
        this.ordenesTrabajoRemision.forEach((ot) => {
          ot.Fecha = this.datePipe.transform(ot.Fecha, "dd/MM/yyyy");
        });
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });

  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    if (this.EsPorFiltro) {
      this.consultarOrdenesDeTrabajoPorFiltro(this.filtros);
    }
    else {
      this.consultarOrdenesDeTrabajo();

    }
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    if (this.EsPorFiltro) {
      this.consultarOrdenesDeTrabajoPorFiltro(this.filtros);
    }
    else {
      this.consultarOrdenesDeTrabajo();
    }
  }

  actualizarObservacion(event: any) {
    if (event) {
      this.consultarOrdenesDeTrabajo();
    }
  }

  cagarData(remision: OrdenTrabajoRemisionDTO) {
    this.remisionModel = remision;
  }


  agregarRemision(event: any, remision: OrdenTrabajoRemisionDTO) {
    var agregar = event.target.checked;
    if (agregar) {
      this.ListGuidsOrdenTrabajo.push(remision.Guid);
      console.log(remision);
    } else {
      var index = this.ListGuidsOrdenTrabajo.indexOf(remision.Guid);
      if (index > -1) {
        this.ListGuidsOrdenTrabajo.splice(index, 1);
      }
    }
  }

  crearRemision(event: any) {
    //debugger;
    if (event.response) {
      this.generarRemision();
    }

  }

  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.confirmar.llenarObjectoData(titulo, Mensaje, Cancelar, this.ListGuidsOrdenTrabajo);
  }

  generarRemision() {
    if (this.ListGuidsOrdenTrabajo.length > 0) {
      this.Remision = new RemisionDTO;
      this.Remision.guidOrdenTrabajo = this.ListGuidsOrdenTrabajo;
      this.loaderService.display(true);
      this.remisionService.crearRemision(this.Remision)
        .subscribe(response => {

        }, errorResponse => {
          this.loaderService.display(false);
          this.toastr.error(errorResponse.error.Message);
        }, () => {
          this.loaderService.display(false);
          this.toastr.success("Ok ");
          this.consultarOrdenesDeTrabajo();
        });
    } else {
      this.toastr.warning("Debe seleccionar oit's procesadas");
    }
  }

}
