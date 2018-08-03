import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmacionComponent } from '../../common/directivas/confirmacion/confirmacion.component';
import { ParametrosModel, OrdenTrabajoModel, PaginacionModel, HerramientaModel, CatalogoModel, ProcesoModel } from '../../common/models/Index';
import { OrdenTrabajoService } from '../../common/services/entity/orden-trabajo.service';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { ProcesoService } from '../../common/services/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { TIPO_PROCESO, ESTADOS_PROCESOS } from '../../proceso/inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-oit-cambio-proceso',
  templateUrl: './oit-cambio-proceso.component.html',
  styleUrls: ['./oit-cambio-proceso.component.css']
})
export class OitCambioProcesoComponent implements OnInit {
  private paginacion: PaginacionModel = new PaginacionModel(1, 10);
  private tipoProcesoActual: CatalogoModel = new CatalogoModel();
  private Paramtros: ParametrosModel;
  private tipoProcesos: CatalogoModel[];
  private Procesos: Array<ProcesoModel>;

  constructor(
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService

  ) {

  }



  ngOnInit() {
    this.consultarParemtros();
  }




  consultarParemtros() {
    this.parametroService.consultarParametrosPorEntidad('PROCESO').subscribe(response => {
      this.tipoProcesos = response.Catalogos.filter(catalogo => { return catalogo.Grupo == "TIPO_PROCESO" });
      this.Paramtros = response;
      this.obtenerTipoProceso(this.tipoProcesos, this.obtenerTipoInspeccionDesdeUrl());
    }, error => {
      console.log(error)
      this.toastrService.error(error.message)
    }, () => {
      this.consultarProcesos();
    });
  }

  obtenerTipoInspeccionDesdeUrl(): string {
    console.log(this.activeRoute.snapshot.url[0].path)
    return this.activeRoute.snapshot.url[0].path;

  }

  obtenerTipoProceso(tiposProcesos: CatalogoModel[], procesoDesdeUrl: string) {
    this.tipoProcesoActual = tiposProcesos.find(proceso => { return proceso.Id == TIPO_PROCESO.REASIGNACION });
  }

  consultarProcesos() {
    if (this.tipoProcesoActual) {
      this.procesoService.consultarProcesosPorTipo(this.tipoProcesoActual, this.paginacion).subscribe(response => {
        this.Procesos = response.Listado
        this.paginacion.CantidadRegistros = response.CantidadRegistros
      }, error => {
        console.log(error)
        this.toastrService.error(error.message)
      });
    }
  }
  obtenerEstilos(proceso: ProcesoModel) {
    switch (proceso.EstadoId) {
      case ESTADOS_PROCESOS.Rechazado: return "rechadado";
    }
  }

  primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }//convertir en pipe este metrodo
}
