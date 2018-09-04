import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { OrdenTrabajoService } from '../../common/services/entity/orden-trabajo.service';
import { ActivatedRoute } from '@angular/router';
import { OrdenTrabajoHistorialProcesosModel } from '../../common/models/OrdenTrabajoHistorialProcesosModel';
import { EntidadModel } from '../../common/models/EntidadDTOModel';
import { OrdenTrabajoModel } from '../../common/models/OrdenTrabajoModel';

@Component({
  selector: 'app-historial-procesos',
  templateUrl: './historial-procesos.component.html',
  styleUrls: ['./historial-procesos.component.css']
})
export class HistorialProcesosComponent implements OnInit {
  private guidOitConsultar: string;
  public historialProcesos: Array<OrdenTrabajoHistorialProcesosModel> = new Array<OrdenTrabajoHistorialProcesosModel>();
  public filter: string;
  public ParametrosCatalogo: EntidadModel[] = []
  public ParametrosConsulta: EntidadModel[] = []
  public ordenTrabajo: OrdenTrabajoModel = new OrdenTrabajoModel();
  constructor(
    private parametroSrv: ParametroService,
    private ordenTrabajoServicio: OrdenTrabajoService,
    private activedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.obtenerOrdenTrabajoURI();

    this.consultarParametros();

    this.consultarOdenTrabajo(this.guidOitConsultar);

    this.consultarHistorialProcesos(this.guidOitConsultar);
  }


  obtenerOrdenTrabajoURI() {
    this.guidOitConsultar = this.activedRoute.snapshot.paramMap.get('id');
  }
  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad('ORDEN_TRABAJO')
      .subscribe(response => {
        this.ParametrosCatalogo = this.ParametrosCatalogo.concat(response.Catalogos);
      })
    this.parametroSrv.consultarParametrosPorEntidad('PROCESO')
      .subscribe(response => {
        this.ParametrosCatalogo = this.ParametrosCatalogo.concat(response.Catalogos);
      })
  };

  consultarOdenTrabajo(guid: string) {
    this.ordenTrabajoServicio.consultarOrdenDeTrabajoPorGuid(guid).subscribe(
      response => {
        this.ordenTrabajo = response;
      }
    )
  }
  consultarHistorialProcesos(guid: string) {
    this.ordenTrabajoServicio.consultarHistorialProcesosDeOrdenDeTrabajo(guid).subscribe(
      response => {
        this.historialProcesos = response;
      }
    );
  }
}
