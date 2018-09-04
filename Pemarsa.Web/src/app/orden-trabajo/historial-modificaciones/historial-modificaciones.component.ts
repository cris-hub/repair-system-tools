import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrdenTrabajoService } from '../../common/services/entity/orden-trabajo.service';
import { OrdenTrabajoHistorialModificacionModel } from '../../common/models/OrdenTrabajoHistorialModificacionModel';
import { PaginacionModel } from '../../common/models/PaginacionModel';

@Component({
  selector: 'app-historial-modificaciones',
  templateUrl: './historial-modificaciones.component.html',
  styleUrls: ['./historial-modificaciones.component.css']
})
export class HistorialModificacionesComponent implements OnInit, OnChanges {



  @Input() public  guidProceso;

  public  paginacion: PaginacionModel = new PaginacionModel(1, 10);
  public  HistorialModificaciones: Array<OrdenTrabajoHistorialModificacionModel>;

  constructor(
    private ordenTrabajoService: OrdenTrabajoService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit() {
    
    this.HistorialModificaciones = new Array<OrdenTrabajoHistorialModificacionModel>();
    this.consultarHistorialModificacionesOrdenDeTrabajo(this.guidProceso, this.paginacion);
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.consultarHistorialModificacionesOrdenDeTrabajo(this.guidProceso, this.paginacion);
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.consultarHistorialModificacionesOrdenDeTrabajo(this.guidProceso, this.paginacion);
  }

  consultarHistorialModificacionesOrdenDeTrabajo(guidProceso, paginacion) {
    this.ordenTrabajoService.consultarHistorialModificacionesOrdenDeTrabajo(guidProceso, paginacion).subscribe(response => {
      this.HistorialModificaciones = response.Listado;
      this.paginacion.TotalRegistros = response.CantidadRegistros;
    });
  }

}
