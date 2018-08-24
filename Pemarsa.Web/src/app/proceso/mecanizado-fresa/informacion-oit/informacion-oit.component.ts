import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/common/services/entity/loaderService';
import { ProcesoService } from 'src/app/common/services/entity';
import { ProcesoInspeccionEntradaModel } from 'src/app/common/models/ProcesoInspeccionEntradaModel';
import { ESTADOS_INSPECCION } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';
import { ProcesoModel } from 'src/app/common/models/ProcesoModel';
import { OrdenTrabajoModel } from 'src/app/common/models/Index';
import { OrdenTrabajoService } from 'src/app/common/services/entity/orden-trabajo.service';

@Component({
  selector: 'app-informacion-oit',
  templateUrl: './informacion-oit.component.html',
  styleUrls: ['./informacion-oit.component.css']
})
export class InformacionOitComponent implements OnInit {

  public proceso: ProcesoModel;
  public ordenTrabajo: OrdenTrabajoModel;

  constructor(
    private activedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private procesoService: ProcesoService,
    private ordenTrabajoService: OrdenTrabajoService,
  ) { }

  ngOnInit() {
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
