import { Component, OnInit } from "@angular/core";
import { PaginacionModel, ParametrosModel, SolicitudOrdenTrabajoModel, CatalogoModel } from "../../../common/models/Index";
import { ConfirmacionComponent } from '../../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { SolicitudOrdenTrabajoService } from "../../../common/services/entity/SolicitudOrdenTrabajo.service";

@Component({
  selector: 'app-listar-solicitudOrdenTrabajo',
  templateUrl: './listar-solicitudOrdenTrabajo.component.html'
})
export class ListarSolicitudOrdenTrabajoComponent implements OnInit {

  private solicitudesOrdenTrabajos: SolicitudOrdenTrabajoModel[];

  // paginacion
  private paginacion: PaginacionModel;
  private parametros: ParametrosModel;
  private esFiltrar: boolean = false;

  private estadosOit: CatalogoModel[]; 

  constructor(
    public solicitudOrdenTrabajoSrv: SolicitudOrdenTrabajoService,
    public parametroSrv: ParametroService,
    private toastr: ToastrService)
  {
    this.paginacion = new PaginacionModel(1, 30);
    this.parametros = new ParametrosModel();
  }

  ngOnInit() {
    this.consultarParametros();
    this.consultarSolicitudesDeTrabajo();
  }

  consultarSolicitudesDeTrabajo() {
    this.solicitudOrdenTrabajoSrv.consultarSolicitudesDeTrabajo(this.paginacion)
      .subscribe(response => {
        this.solicitudesOrdenTrabajos = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("SOLICITUD")
      .subscribe(response => {
        this.parametros = response;
        this.estadosOit = this.parametros.Catalogos.filter(e => e.Grupo == "ESTADOS_SOLICITUD");
      });
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.consultarSolicitudesDeTrabajo();
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.consultarSolicitudesDeTrabajo();
  }
}
