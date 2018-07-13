import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcesoModel } from '../../../common/models/Index';

@Component({
  selector: 'app-inspeccion-herramienta',
  templateUrl: './inspeccion-herramienta.component.html',
  styleUrls: ['./inspeccion-herramienta.component.css']
})
export class InspeccionHerramientaComponent implements OnInit {

  private Proceso:ProcesoModel

  constructor(
    private procesoService: ProcesoService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.obtenerProcesoDesdeUrl()
  }



  ngOnInit() {
    this.consultarProceso();
  }

  obtenerProcesoDesdeUrl(): string {
    return this.activedRoute.snapshot.paramMap.get('id');
  }

  consultarProceso() {
    this.procesoService.consultarProcesoPorGuid(this.obtenerProcesoDesdeUrl()).subscribe(response => {
      this.Proceso = response
    }, error => {
      this.toastrService.error(error.message)
    });
  }

}
