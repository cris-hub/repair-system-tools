import { Component, OnInit } from '@angular/core';
import { FiltroProcesoComponent } from '../../filtro-proceso/filtro-proceso.component';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ProcesoService } from '../../../common/services/entity';
import { ProcesoModel, OrdenTrabajoModel } from '../../../common/models/Index';
import { OrdenTrabajoService } from '../../../common/services/entity/orden-trabajo.service';

@Component({
  selector: 'app-mecanizado-fresa-procesar',
  templateUrl: './mecanizado-fresa-procesar.component.html',
  styleUrls: ['./mecanizado-fresa-procesar.component.css']
})
export class MecanizadoFresaProcesarComponent implements OnInit {


  public proceso: ProcesoModel;
  public ordenTrabajo: OrdenTrabajoModel;


  constructor(
    private activedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private procesoService: ProcesoService,
    private ordenTrabajoService: OrdenTrabajoService,
  ) { }

  ngOnInit() {
    this.obtenerParametrosRuta();
    this.consultarProceso();

  }

  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    return parametrosUlrMap;
  }


  consultarProceso() {
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response;
        this.loaderService.display(false)
      }, error => {

      }, () => {

        this.ordenTrabajoService.consultarOrdenDeTrabajoPorGuid(this.proceso.OrdenTrabajo.Guid)
          .subscribe(response => {
            this.ordenTrabajo = response;
            console.log(this.ordenTrabajo);
          });

      });
  }

}






